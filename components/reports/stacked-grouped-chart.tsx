import * as d3 from "d3";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Easing,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Svg, { G, Rect, Text as SvgText } from "react-native-svg";

interface SeriesDatum {
  key: string;
  values: number[];
}

interface StackedGroupedChartProps {
  width?: number;
  height?: number;
  data?: SeriesDatum[]; // each series has values for each category
  categories?: string[];
}

export default function StackedGroupedChart({
  width = Dimensions.get("window").width - 32,
  height = 200,
  data,
  categories,
}: StackedGroupedChartProps) {
  const [mode, setMode] = useState<"stacked" | "grouped">("stacked");

  // Animated Rect from react-native-svg
  const AnimatedRect = Animated.createAnimatedComponent(Rect);

  // bumps generator (Lee Byron) — creates smoothly-varying non-negative numbers
  function bumps(m: number) {
    const values: number[] = [];
    for (let i = 0; i < m; ++i) values[i] = 0.1 + 0.1 * Math.random();
    for (let j = 0; j < 5; ++j) {
      const x = 1 / (0.1 + Math.random());
      const y = 2 * Math.random() - 0.5;
      const z = 10 / (0.1 + Math.random());
      for (let i = 0; i < m; i++) {
        const w = (i / m - y) * z;
        values[i] += x * Math.exp(-w * w);
      }
    }
    for (let i = 0; i < m; ++i) values[i] = Math.max(0, values[i]);
    return values;
  }

  // sample fallback data if none provided
  const series = useMemo(() => {
    if (data && data.length) return data;
    // generate smoothly varying sample data using bumps
    const m = 7;
    const base = bumps(m);
    return [
      { key: "Paid", values: base.map((v) => Math.round(v * 20 + 6)) },
      { key: "Unpaid", values: base.map((v) => Math.round(v * 6 + 2)) },
      { key: "Overdue", values: base.map((v) => Math.round(v * 4 + 1)) },
    ];
  }, [data]);

  const cats = useMemo(() => {
    if (categories && categories.length) return categories;
    return ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];
  }, [categories]);

  const margins = { top: 8, right: 20, bottom: 28, left: 20 };
  const innerWidth = Math.max(0, width - margins.left - margins.right);
  const innerHeight = Math.max(0, height - margins.top - margins.bottom);

  // prepare stacked data
  const stackKeys = series.map((s) => s.key);
  const valuesByCategory = cats.map((_, i) => {
    const obj: Record<string, number> = {};
    series.forEach((s) => (obj[s.key] = s.values[i] ?? 0));
    return obj;
  });

  const stackGen = d3.stack().keys(stackKeys as any);
  const stacked = stackGen(valuesByCategory as any);

  // scales
  const x0 = d3.scaleBand().domain(cats).range([0, innerWidth]).padding(0.18);

  // For grouped mode: inner band for each series inside a category
  const x1 = d3
    .scaleBand()
    .domain(stackKeys)
    .range([0, x0.bandwidth()])
    .padding(0.08);

  const maxStack =
    (d3
      ? d3.max(stacked, (s: any) => d3.max(s, (d: any) => d[1] as number))
      : 0) || 0;
  const maxGroup =
    (d3 ? d3.max(series, (s: any) => d3.max(s.values as number[]) ?? 0) : 0) ||
    0;
  const yMax = Math.ceil(Math.max(maxStack, maxGroup) * 1.05);
  const y = d3.scaleLinear().domain([0, yMax]).range([innerHeight, 0]);

  const color = d3.scaleOrdinal(d3.schemeCategory10).domain(stackKeys as any);

  // Animation references for each category & series: stores Animated.Value for y and height
  const animRef = useRef<
    {
      y: Animated.Value;
      h: Animated.Value;
    }[][]
  >([]);

  // include only stable/serializable dependencies to satisfy lint rules
  const serializedSeries = series.map((s) => s.values.join(",")).join("|");
  const x0bw = x0.bandwidth();
  const x1bw = x1.bandwidth();
  const catsKey = cats.join(",");

  // initialize animated values for the current layout
  useEffect(() => {
    // prepare targets for both modes so we can animate between them
    const stackedTargets: { y: number; h: number; x: number; w: number }[][] =
      [];
    const groupedTargets: { y: number; h: number; x: number; w: number }[][] =
      [];

    // build stacked numeric structure
    cats.forEach((_, ci) => {
      stackedTargets[ci] = [];
      groupedTargets[ci] = [];
      // stacked cumulative
      let acc = 0;
      series.forEach((s, si) => {
        const val = s.values[ci] ?? 0;
        const y0 = acc;
        const y1 = acc + val;
        acc = y1;
        const h = Math.max(0, y(y0) - y(y1));
        const yPos = y(y1);
        stackedTargets[ci][si] = {
          y: yPos,
          h,
          x: x0(cats[ci]) || 0,
          w: x0.bandwidth(),
        };

        // grouped
        const gx = (x0(cats[ci]) || 0) + (x1(s.key) || 0);
        const gVal = val;
        const gy = y(gVal);
        const gh = Math.max(0, innerHeight - gy);
        groupedTargets[ci][si] = { y: gy, h: gh, x: gx, w: x1.bandwidth() };
      });
    });

    // initialize animRef values if not present
    if (!animRef.current || animRef.current.length === 0) {
      animRef.current = cats.map((_, ci) =>
        series.map((_, si) => ({
          y: new Animated.Value(stackedTargets[ci][si].y),
          h: new Animated.Value(stackedTargets[ci][si].h),
        }))
      );
    }

    // animate to current mode targets on mount and when data changes
    const toTargets = mode === "stacked" ? stackedTargets : groupedTargets;
    const animations: Animated.CompositeAnimation[] = [];
    cats.forEach((_, ci) => {
      series.forEach((_, si) => {
        const tgt = toTargets[ci][si];
        const ref = animRef.current[ci][si];
        animations.push(
          Animated.timing(ref.y, {
            toValue: tgt.y,
            duration: 600,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: false,
          })
        );
        animations.push(
          Animated.timing(ref.h, {
            toValue: tgt.h,
            duration: 600,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: false,
          })
        );
      });
    });
    Animated.parallel(animations).start();
  }, [
    width,
    height,
    serializedSeries,
    mode,
    catsKey,
    innerHeight,
    x0bw,
    x1bw,
    yMax,
    series,
    x0,
    x1,
    y,
    cats,
  ]);

  return (
    <View
      style={{ width }}
      className="bg-gray-100 border border-gray-200 rounded-xs"
    >
      <View className="flex-row justify-between items-center p-4">
        <Text className="text-h-6 font-dm-sans-bold">Revenue</Text>
        <View className="flex-row">
          <TouchableOpacity
            onPress={() => setMode("stacked")}
            className={`px-4 py-3 mr-4 rounded-xs ${
              mode === "stacked"
                ? "bg-primary-500"
                : "bg-gray-300 border border-gray-400"
            }`}
          >
            <Text
              className={`text-xs ${
                mode === "stacked" ? "text-white" : "text-gray-900"
              }`}
            >
              Stacked
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setMode("grouped")}
            className={`px-4 py-3 rounded-xs ${
              mode === "grouped"
                ? "bg-primary-500"
                : "bg-gray-300 border border-gray-400"
            }`}
          >
            <Text
              className={`text-xs ${
                mode === "grouped" ? "text-white" : "text-gray-900"
              }`}
            >
              Grouped
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          paddingLeft: margins.left,
          paddingRight: margins.right,
          paddingTop: 8,
          marginBottom: 16,
        }}
      >
        <Svg width={innerWidth} height={innerHeight + margins.bottom}>
          <G y={margins.top}>
            {/* horizontal grid lines and y labels */}
            {(d3 ? d3.range(5) : [0, 1, 2, 3, 4]).map((i: number) => {
              const v = (yMax / 4) * i;
              const yPos = y(v);
              return (
                <G key={`grid-${i}`}>
                  <Rect
                    x={0}
                    y={yPos}
                    width={innerWidth}
                    height={1}
                    fill={"#ccc"}
                    opacity={0.9}
                  />
                  <SvgText
                    x={-8}
                    y={yPos + 4}
                    fontSize={10}
                    fill={"#4B5563"} // tailwind gray-600
                    textAnchor="end"
                    fontFamily={"DMSans-Regular"}
                  >
                    {`${Math.round(v)}k`}
                  </SvgText>
                </G>
              );
            })}

            {/* bars */}
            {cats.map((cat, i) => {
              const x = x0(cat) || 0;
              if (mode === "stacked") {
                return (
                  <G key={`stack-${i}`}>
                    {(stacked as any[]).map((layer: any, si: number) => {
                      // try to read animated values, fall back to static positions
                      const animFor = animRef.current?.[i]?.[si];
                      if (animFor) {
                        return (
                          <AnimatedRect
                            key={`rect-${i}-${si}`}
                            x={x}
                            y={animFor.y as any}
                            width={x0.bandwidth()}
                            height={animFor.h as any}
                            fill={color(layer.key) as string}
                            rx={4}
                          />
                        );
                      }
                      const [y0v, y1v] = [
                        layer[i][0] as number,
                        layer[i][1] as number,
                      ];
                      const h = Math.max(0, y(y0v) - y(y1v));
                      const yPos = y(y1v);
                      return (
                        <Rect
                          key={`rect-${i}-${si}`}
                          x={x}
                          y={yPos}
                          width={x0.bandwidth()}
                          height={h}
                          fill={color(layer.key) as string}
                          rx={4}
                        />
                      );
                    })}
                    {/* x label */}
                    <SvgText
                      x={x + x0.bandwidth() / 2}
                      y={innerHeight + 16}
                      fontSize={11}
                      fill={"#94a3b8"}
                      textAnchor="middle"
                      fontFamily={"DMSans-Regular"}
                    >
                      {cat}
                    </SvgText>
                  </G>
                );
              }
              // grouped
              return (
                <G key={`group-${i}`}>
                  {series.map((s, si) => {
                    const gx = x + (x1(s.key) || 0);
                    const animFor = animRef.current?.[i]?.[si];
                    if (animFor) {
                      return (
                        <AnimatedRect
                          key={`grect-${i}-${si}`}
                          x={gx}
                          y={animFor.y as any}
                          width={x1.bandwidth()}
                          height={animFor.h as any}
                          fill={color(s.key) as string}
                          rx={4}
                        />
                      );
                    }
                    const val = s.values[i] ?? 0;
                    const barH = Math.max(0, innerHeight - y(val));
                    const yPos = y(val);
                    return (
                      <Rect
                        key={`grect-${i}-${si}`}
                        x={gx}
                        y={yPos}
                        width={x1.bandwidth()}
                        height={barH}
                        fill={color(s.key) as string}
                        rx={4}
                      />
                    );
                  })}
                  <SvgText
                    x={x + x0.bandwidth() / 2}
                    y={innerHeight + 16}
                    fontSize={11}
                    fill={"#94a3b8"}
                    textAnchor="middle"
                    fontFamily={"DMSans-Regular"}
                  >
                    {cat}
                  </SvgText>
                </G>
              );
            })}
          </G>
        </Svg>
      </View>
    </View>
  );
}
