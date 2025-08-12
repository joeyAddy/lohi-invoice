// Example usage documentation for the Redux + RTK Query setup

/\*\*

- REDUX TOOLKIT + RTK QUERY SETUP COMPLETE!
-
- ## Folder Structure Created:
- ```

  ```
- lib/
- ├── api/
- │ ├── rtkApi.ts # Main RTK Query API slice
- │ ├── endpoints/ # Domain-specific endpoints
- │ │ ├── auth.ts # Authentication endpoints
- │ │ └── user.ts # User management endpoints
- │ └── constants/
- │ └── endpoints.ts # API URL constants
- ├── store/
- │ ├── index.ts # Store configuration
- │ └── slices/
- │ └── authSlice.ts # Authentication state slice
- ├── hooks/
- │ ├── redux.ts # Typed Redux hooks
- │ └── useAuth.ts # Custom auth hook
- ├── providers/
- │ └── ReduxProvider.tsx # Redux Provider component
- └── index.ts # Main exports
- ```

  ```
-
- ## Key Features:
- 1.  ✅ TypeScript fully configured
- 2.  ✅ RTK Query for API calls
- 3.  ✅ Auth slice for state management
- 4.  ✅ Custom useAuth hook
- 5.  ✅ Auto-generated hooks from RTK Query
- 6.  ✅ Token management with auto-headers
- 7.  ✅ Error handling and loading states
- 8.  ✅ Provider setup in app layout
-
- ## Usage Examples:
-
- ### 1. Using the useAuth hook (Recommended):
- ```tsx

  ```
- import { useAuth } from '@/lib';
-
- const LoginScreen = () => {
- const { login, isLoading, error, isAuthenticated } = useAuth();
-
- const handleLogin = async () => {
-     const result = await login({ email, password });
-     if (result.success) {
-       // Navigate to home
-     }
- };
- };
- ```

  ```
-
- ### 2. Using RTK Query hooks directly:
- ```tsx

  ```
- import { useLoginMutation } from '@/lib';
-
- const [loginMutation, { isLoading, error }] = useLoginMutation();
- ```

  ```
-
- ### 3. Using Redux state selectors:
- ```tsx

  ```
- import { useAppSelector, selectUser, selectIsAuthenticated } from '@/lib';
-
- const user = useAppSelector(selectUser);
- const isAuthenticated = useAppSelector(selectIsAuthenticated);
- ```

  ```
-
- ### 4. Dispatching actions:
- ```tsx

  ```
- import { useAppDispatch, logout } from '@/lib';
-
- const dispatch = useAppDispatch();
- dispatch(logout());
- ```

  ```
-
- ## Available API Endpoints:
-
- ### Authentication:
- - useLoginMutation()
- - useRegisterMutation()
- - useLogoutMutation()
- - useRefreshTokenMutation()
- - useForgotPasswordMutation()
- - useResetPasswordMutation()
-
- ### User Management:
- - useGetUserProfileQuery()
- - useUpdateProfileMutation()
- - useChangePasswordMutation()
-
- ## Next Steps:
- 1.  Update API_BASE_URL in lib/api/constants/endpoints.ts
- 2.  Add more endpoints as needed
- 3.  Implement navigation based on auth state
- 4.  Add persistent storage (Redux Persist) if needed
- 5.  Add refresh token logic
      \*/

export {}; // Make this file a module
