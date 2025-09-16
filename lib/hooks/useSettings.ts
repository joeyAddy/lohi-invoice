import { useCallback } from "react";
import { Alert } from "react-native";
import type {
  UpdateAgencyRequest,
  UpdateFreelancerRequest,
} from "../../interfaces";
import {
  useUpdateAgencyMutation,
  useUpdateFreelancerMutation,
  useUpdateProfileMutation,
} from "../api/rtkApi";
import {
  clearError,
  selectUser,
  setError,
  setLoading,
  updateUserProfile,
} from "../store/slices/authSlice";
import { useAppDispatch, useAppSelector } from "./redux";

export const useSettings = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  // RTK Query mutations
  const [updateProfile] = useUpdateProfileMutation();
  const [updateAgency] = useUpdateAgencyMutation();
  const [updateFreelancer] = useUpdateFreelancerMutation();

  // Update user personal information
  const updatePersonalInfo = useCallback(
    async (data: {
      firstName?: string;
      lastName?: string;
      phone?: string;
      avatar?: string;
    }) => {
      try {
        dispatch(setLoading(true));
        dispatch(clearError());

        const result = await updateProfile(data).unwrap();

        // Update Redux state
        dispatch(updateUserProfile(data));

        return { success: true, data: result };
      } catch (error: any) {
        const errorMessage =
          error?.data?.message || "Failed to update personal information";
        console.error("Personal info update error:", error);
        dispatch(setError(errorMessage));
        return { success: false, error: errorMessage };
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch, updateProfile]
  );

  // Update agency information
  const updateAgencyInfo = useCallback(
    async (data: Partial<Omit<UpdateAgencyRequest, "id">>) => {
      if (!user?.agency?.id) {
        const error = "Agency ID not found";
        dispatch(setError(error));
        return { success: false, error };
      }

      try {
        dispatch(setLoading(true));
        dispatch(clearError());

        const updateData: UpdateAgencyRequest = {
          id: user.agency.id,
          ...data,
        };

        const result = await updateAgency(updateData).unwrap();

        // TODO: Update Redux state with new agency data
        // dispatch(updateAgencyProfile(result));

        return { success: true, data: result };
      } catch (error: any) {
        const errorMessage =
          error?.data?.message || "Failed to update agency information";
        console.error("Agency update error:", error);
        dispatch(setError(errorMessage));
        return { success: false, error: errorMessage };
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch, updateAgency, user?.agency?.id]
  );

  // Update freelancer information
  const updateFreelancerInfo = useCallback(
    async (data: Partial<Omit<UpdateFreelancerRequest, "id">>) => {
      if (!user?.freelancer?.id) {
        const error = "Freelancer ID not found";
        dispatch(setError(error));
        return { success: false, error };
      }

      try {
        dispatch(setLoading(true));
        dispatch(clearError());

        const updateData: UpdateFreelancerRequest = {
          id: user.freelancer.id,
          ...data,
        };

        const result = await updateFreelancer(updateData).unwrap();

        // TODO: Update Redux state with new freelancer data
        // dispatch(updateFreelancerProfile(result));

        return { success: true, data: result };
      } catch (error: any) {
        const errorMessage =
          error?.data?.message || "Failed to update freelancer information";
        console.error("Freelancer update error:", error);
        dispatch(setError(errorMessage));
        return { success: false, error: errorMessage };
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch, updateFreelancer, user?.freelancer?.id]
  );

  // Generic function to update business info based on user type
  const updateBusinessInfo = useCallback(
    async (data: any) => {
      if (user?.agency) {
        return await updateAgencyInfo(data);
      } else if (user?.freelancer) {
        return await updateFreelancerInfo(data);
      } else {
        const error = "No business profile found";
        dispatch(setError(error));
        return { success: false, error };
      }
    },
    [user, updateAgencyInfo, updateFreelancerInfo, dispatch]
  );

  // Settings utility functions
  const showSuccessAlert = useCallback(
    (message: string, onClose?: () => void) => {
      Alert.alert("Success", message, [
        {
          text: "OK",
          onPress: onClose,
        },
      ]);
    },
    []
  );

  const showErrorAlert = useCallback((message: string) => {
    Alert.alert("Error", message);
  }, []);

  // Determine user type and business data
  const userType: "agency" | "freelancer" | null = user?.agency
    ? "agency"
    : user?.freelancer
      ? "freelancer"
      : null;

  const businessData = user?.agency || user?.freelancer;

  return {
    // User data
    user,
    userType,
    businessData,

    // Update functions
    updatePersonalInfo,
    updateAgencyInfo,
    updateFreelancerInfo,
    updateBusinessInfo,

    // Utility functions
    showSuccessAlert,
    showErrorAlert,
    clearError: () => dispatch(clearError()),
  };
};
