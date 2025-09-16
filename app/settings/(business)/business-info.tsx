import { Header } from "@/components/shared";
import { AgencyForm, FreelancerForm } from "@/components/ui";
import { router } from "expo-router";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  CreateAgencyRequest,
  CreateFreelancerRequest,
} from "../../../interfaces";
import { CurrencyData } from "../../../lib/data/currencies";
import { TimezoneData } from "../../../lib/data/timezones";
import { useSettings } from "../../../lib/hooks/useSettings";

// Type definitions for location
interface LocationData {
  name: string;
  code: string;
  type: "country" | "state" | "city";
}

interface SelectedLocation {
  country: LocationData | null;
  state: LocationData | null;
  city: LocationData | null;
}

export default function BusinessInfo() {
  const {
    user,
    userType,
    businessData,
    updateBusinessInfo,
    showSuccessAlert,
    showErrorAlert,
  } = useSettings();

  const handleAgencySubmit = async (data: CreateAgencyRequest) => {
    const result = await updateBusinessInfo(data);

    if (result.success) {
      showSuccessAlert("Business information updated successfully!", () => {
        router.back();
      });
    } else {
      showErrorAlert(result.error || "Failed to update business information");
    }
  };

  const handleFreelancerSubmit = async (data: CreateFreelancerRequest) => {
    const result = await updateBusinessInfo(data);

    if (result.success) {
      showSuccessAlert("Business information updated successfully!", () => {
        router.back();
      });
    } else {
      showErrorAlert(result.error || "Failed to update business information");
    }
  };

  if (!userType || !businessData) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <Header
          title="Business Info"
          leftIcon="chevron-back"
          className="px-4 pt-2"
        />
        <View className="flex-1 items-center justify-center p-4">
          <Text className="text-lg text-gray-600 text-center">
            No business profile found. Please complete your onboarding process.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  // Prepare initial data for forms
  const getInitialLocation = (): SelectedLocation => {
    const address = user?.agency?.address || user?.freelancer?.address;
    return {
      country: address?.country
        ? { name: address.country, code: "", type: "country" }
        : null,
      state: address?.state
        ? { name: address.state, code: "", type: "state" }
        : null,
      city: address?.city
        ? { name: address.city, code: "", type: "city" }
        : null,
    };
  };

  const getInitialCurrency = (): CurrencyData => {
    const currency =
      user?.agency?.currency || user?.freelancer?.currency || "USD";
    return {
      code: currency,
      name: currency === "USD" ? "US Dollar" : currency,
      symbol: currency === "USD" ? "$" : currency,
      region: "North America",
      popular: true,
    };
  };

  const getInitialTimezone = (): TimezoneData => {
    const timezone =
      user?.agency?.timezone ||
      user?.freelancer?.timezone ||
      "America/New_York";
    return {
      value: timezone,
      label: timezone.replace("_", " "),
      offset: "-05:00",
      region: "America",
    };
  };

  // Convert business data to form data
  const getAgencyInitialData = (): Partial<CreateAgencyRequest> | undefined => {
    if (!user?.agency) return undefined;

    return {
      legalName: user.agency.legalName,
      displayName: user.agency.displayName,
      taxId: user.agency.taxId,
      address: user.agency.address,
      phone: user.agency.phone,
      email: user.agency.email,
      website: user.agency.website,
      currency: user.agency.currency,
      timezone: user.agency.timezone,
      businessType: user.agency.businessType,
      industry: user.agency.industry,
    };
  };

  const getFreelancerInitialData = ():
    | Partial<CreateFreelancerRequest>
    | undefined => {
    if (!user?.freelancer) return undefined;

    return {
      professionalName: user.freelancer.professionalName,
      taxId: user.freelancer.taxId,
      address: user.freelancer.address,
      phone: user.freelancer.phone,
      email: user.freelancer.email,
      website: user.freelancer.website,
      currency: user.freelancer.currency,
      timezone: user.freelancer.timezone,
      profession: user.freelancer.profession,
      bio: user.freelancer.bio,
      portfolioUrl: user.freelancer.portfolioUrl,
    };
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header
        title="Business Info"
        leftIcon="chevron-back"
        onPressLeftIcon={() => router.back()}
        className="px-4 pt-2"
      />

      <ScrollView
        className="flex-1 px-4"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        <View className="mt-6">
          <Text className="text-2xl font-playfair-bold text-gray-900 mt-4 mb-2">
            {userType === "agency"
              ? "Agency Information"
              : "Freelancer Information"}
          </Text>
          <Text className="text-b-2 leading-6 mb-6">
            Update your business details for invoices and contracts.
          </Text>

          {userType === "agency" ? (
            <AgencyForm
              initialData={getAgencyInitialData()}
              initialLocation={getInitialLocation()}
              initialCurrency={getInitialCurrency()}
              initialTimezone={getInitialTimezone()}
              onSubmit={handleAgencySubmit}
              submitButtonText="Save Changes"
              showOptionalFields={true}
              readOnlyFields={["currency", "timezone"]}
            />
          ) : (
            <FreelancerForm
              initialData={getFreelancerInitialData()}
              initialLocation={getInitialLocation()}
              initialCurrency={getInitialCurrency()}
              initialTimezone={getInitialTimezone()}
              onSubmit={handleFreelancerSubmit}
              submitButtonText="Save Changes"
              showOptionalFields={true}
              readOnlyFields={["currency", "timezone"]}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
