# Button Component

A flexible, customizable Button component built with React Native and styled with Tailwind CSS classes via NativeWind.

## Features

- **Variants**: `primary` (filled) and `outline` (border only)
- **Sizes**: `sm` (small), `md` (medium), `lg` (large)
- **Full TypeScript support**
- **Forward ref support**
- **Customizable styling via className prop**
- **Disabled state support**

## Props

| Prop        | Type                     | Default     | Description                 |
| ----------- | ------------------------ | ----------- | --------------------------- |
| `variant`   | `"primary" \| "outline"` | `"primary"` | Button style variant        |
| `size`      | `"sm" \| "md" \| "lg"`   | `"md"`      | Button size                 |
| `children`  | `React.ReactNode`        | -           | Button content (required)   |
| `className` | `string`                 | -           | Additional Tailwind classes |
| `disabled`  | `boolean`                | `false`     | Disable the button          |
| `...props`  | `TouchableOpacityProps`  | -           | All TouchableOpacity props  |

## Usage Examples

### Basic Usage

```tsx
import Button from "@/components/ui/button";

// Primary button (default)
<Button onPress={() => console.log("Clicked!")}>
  Click Me
</Button>

// Outline button
<Button variant="outline" onPress={() => console.log("Clicked!")}>
  Outline Button
</Button>
```

### Different Sizes

```tsx
<Button size="sm">Small Button</Button>
<Button size="md">Medium Button</Button>
<Button size="lg">Large Button</Button>
```

### Custom Styling

```tsx
<Button
  variant="primary"
  className="bg-red-600 active:bg-red-700"
  onPress={() => console.log("Custom button")}
>
  Custom Red Button
</Button>
```

### Disabled State

```tsx
<Button disabled>Disabled Button</Button>
```

## Styling Details

### Primary Variant

- Background: `bg-blue-600`
- Active state: `active:bg-blue-700`
- Text: `text-white`

### Outline Variant

- Border: `border-2 border-blue-600`
- Background: `bg-transparent`
- Active state: `active:bg-blue-50`
- Text: `text-blue-600`

### Sizes

- **Small**: `px-3 py-2 text-sm`
- **Medium**: `px-4 py-3 text-base`
- **Large**: `px-6 py-4 text-lg`

## Dependencies

- React Native
- NativeWind (Tailwind CSS for React Native)
- clsx (for conditional class names)
