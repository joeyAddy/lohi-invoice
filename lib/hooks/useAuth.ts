import type { Href } from "expo-router";
import { router } from "expo-router";
import { useCallback, useEffect } from "react";
import type { LoginRequest, RegisterRequest } from "../../interfaces";
import {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
} from "../api/rtkApi";
import {
  clearError,
  loginSuccess,
  logout as logoutAction,
  selectAuth,
  selectAuthLoading,
  selectIsAuthenticated,
  setError,
  setLoading,
} from "../store/slices/authSlice";
import { useAppDispatch, useAppSelector } from "./redux";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const authState = useAppSelector(selectAuth);

  // RTK Query mutations
  const [loginMutation] = useLoginMutation();
  const [registerMutation] = useRegisterMutation();
  const [logoutMutation] = useLogoutMutation();

  // Login function
  const login = useCallback(
    async (credentials: LoginRequest) => {
      try {
        dispatch(setLoading(true));
        dispatch(clearError());

        const result = await loginMutation(credentials).unwrap();

        // Update auth state
        dispatch(
          loginSuccess({
            user: result.user,
            token: result.tokens.access.token,
            refreshToken: result.tokens.refresh.token,
          })
        );

        return { success: true, data: result };
      } catch (error: any) {
        const errorMessage =
          error?.data?.message ?? error.error ?? "Login failed";
        console.log("Login error:", error);
        dispatch(setError(errorMessage));
        return { success: false, error: errorMessage };
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch, loginMutation]
  );

  // Register function
  const register = useCallback(
    async (userData: RegisterRequest) => {
      try {
        dispatch(setLoading(true));
        dispatch(clearError());

        const result = await registerMutation(userData).unwrap();

        // Update auth state
        dispatch(
          loginSuccess({
            user: result.user,
            token: result.tokens.access.token,
            refreshToken: result.tokens.refresh.token,
          })
        );

        return { success: true, data: result };
      } catch (error: any) {
        const errorMessage = error?.data?.message || "Registration failed";
        dispatch(setError(errorMessage));
        return { success: false, error: errorMessage };
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch, registerMutation]
  );

  // Logout function
  const logout = useCallback(async () => {
    try {
      // Call API logout (optional, for token invalidation)
      await logoutMutation().unwrap();
    } catch (error) {
      // Even if API call fails, we still want to clear local state
      console.warn("Logout API call failed:", error);
    } finally {
      // Clear local auth state
      dispatch(logoutAction());
    }
  }, [dispatch, logoutMutation]);

  return {
    // Auth state
    ...authState,

    // Actions
    login,
    register,
    logout,
    clearError: () => dispatch(clearError()),
  };
};

/**
 * Custom hook to check authentication status and redirect if not authenticated
 * @param redirectPath - Path to redirect to if not authenticated (default: '/(authentication)/login')
 * @returns Authentication status and loading state
 */
export const useAuthGuard = (
  redirectPath: Href = "/(authentication)/login"
) => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isLoading = useAppSelector(selectAuthLoading);

  useEffect(() => {
    // Don't redirect while still loading authentication state
    if (isLoading) return;

    // If not authenticated and not currently loading, redirect to login
    if (!isAuthenticated) {
      router.replace(redirectPath);
    }
  }, [isAuthenticated, isLoading, redirectPath]);

  return {
    isAuthenticated,
    isLoading,
  };
};
