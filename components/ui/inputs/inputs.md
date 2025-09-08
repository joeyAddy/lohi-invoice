# Input Components

A comprehensive set of input components built with React Native and styled with your custom Tailwind design tokens.

## Components

### 1. DefaultInput

A flexible input component with optional left icon, validation states, and error handling.

### 2. PasswordInput

A specialized input for passwords with built-in lock icon, password visibility toggle, and validation states.

## Features

- **States**: Focus, Error, Valid, Disabled
- **Validation**: Built-in error display with custom error messages
- **Icons**: Optional left icons (DefaultInput) and built-in icons (PasswordInput)
- **Accessibility**: Proper focus management and disabled states
- **TypeScript**: Full type safety with extended TextInput props
- **Custom Styling**: Extensible via className props

## DefaultInput Props

| Prop             | Type              | Default | Description                          |
| ---------------- | ----------------- | ------- | ------------------------------------ |
| `label`          | `string`          | -       | Optional label text above input      |
| `placeholder`    | `string`          | -       | Placeholder text                     |
| `error`          | `string`          | -       | Error message to display below input |
| `leftIcon`       | `React.ReactNode` | -       | Optional icon on the left side       |
| `className`      | `string`          | -       | Additional classes for container     |
| `inputClassName` | `string`          | -       | Additional classes for input field   |
| `disabled`       | `boolean`         | `false` | Disable the input                    |
| `...props`       | `TextInputProps`  | -       | All React Native TextInput props     |

## PasswordInput Props

| Prop                 | Type             | Default                 | Description                                               |
| -------------------- | ---------------- | ----------------------- | --------------------------------------------------------- |
| `label`              | `string`         | -                       | Optional label text above input                           |
| `placeholder`        | `string`         | `"Enter your password"` | Placeholder text                                          |
| `error`              | `string`         | -                       | Error message to display below input                      |
| `className`          | `string`         | -                       | Additional classes for container                          |
| `inputClassName`     | `string`         | -                       | Additional classes for input field                        |
| `disabled`           | `boolean`        | `false`                 | Disable the input                                         |
| `showPasswordToggle` | `boolean`        | `true`                  | Show/hide password visibility toggle                      |
| `...props`           | `TextInputProps` | -                       | All React Native TextInput props (except secureTextEntry) |

## Usage Examples

### Basic Default Input

```tsx
import { DefaultInput } from "@/components/ui/inputs";

<DefaultInput
  label="Email"
  placeholder="Enter your email"
  value={email}
  onChangeText={setEmail}
/>;
```

### Input with Icon and Validation

```tsx
import { DefaultInput } from "@/components/ui/inputs";

const UserIcon = () => <Icon name="user" size={20} color="#1b365d" />;

<DefaultInput
  label="Username"
  placeholder="Enter username"
  value={username}
  onChangeText={setUsername}
  error={usernameError}
  leftIcon={<UserIcon />}
/>;
```

### Password Input

```tsx
import { PasswordInput } from "@/components/ui/inputs";

<PasswordInput
  label="Password"
  placeholder="Enter your password"
  value={password}
  onChangeText={setPassword}
  error={passwordError}
/>;
```

### Disabled Input

```tsx
<DefaultInput label="Read Only" value="Cannot edit this" disabled={true} />
```

## Design States

### Focus State

- Border: `border-primary-500/50` (#1b365d)
- Background: `bg-neutral-100` (#ffffff)

### Error State

- Border: `border-error-500` (#d10000)
- Label: `text-error-500` (#d10000)
- Error text: `text-error-500` (#d10000)

### Default State

- Border: `border-neutral-300` (#d2d2d2)
- Background: `bg-neutral-100` (#ffffff)
- Text: `text-neutral-900` (#4a4a4a)

### Disabled State

- Border: `border-neutral-200` (#e8e8e8)
- Background: `bg-neutral-200` (#e8e8e8)
- Text: `text-neutral-600` (#8e8e8e)

## Password Input Icons

### Lock Icon

- Always visible on the left
- Changes color based on state (default, error, disabled)

### Eye Toggle Icon

- Toggle between eye (password hidden) and eye-off (password visible)
- Can be disabled via `showPasswordToggle={false}`
- Respects disabled state

## Customization

Both components support extensive customization through:

- `className` - Style the container
- `inputClassName` - Style the input field directly
- Custom icons via `leftIcon` prop (DefaultInput)
- All standard TextInput props

## Dependencies

- React Native
- NativeWind (Tailwind CSS for React Native)
- Your custom design tokens
