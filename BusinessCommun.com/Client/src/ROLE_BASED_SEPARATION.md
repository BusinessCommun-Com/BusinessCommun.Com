# Role-Based Component Separation Guide

## Overview

This guide explains how to use role-based access control (RBAC) to separate user and admin components in your React application.

## Architecture

### 1. **Authentication Flow**

- User logs in and receives a JWT token containing role information
- `AuthProvider` stores user data and extracts role from token
- `useAuth()` hook provides access to user and role throughout the app

### 2. **Components Created**

#### `AuthProvider.jsx` (Enhanced)

- Manages user authentication state
- Extracts and stores user role from JWT token
- Exports `useAuth()` hook for accessing auth data

```jsx
const { user, role, setUser, setRole } = useAuth();
```

#### `ProtectedRoute.jsx` (Enhanced)

- Base route protection component
- Supports optional role requirement

```jsx
// Protect route with specific role
<ProtectedRoute requiredRole="admin">
  <AdminPanel />
</ProtectedRoute>

// Protect route for any authenticated user
<ProtectedRoute>
  <Dashboard />
</ProtectedRoute>
```

#### `AdminRoute.jsx` & `UserRoute.jsx` (Convenience Components)

- Pre-configured route protectors
- Admin routes: only accessible to users with "admin" role
- User routes: only accessible to users with "user" role

```jsx
<Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>} />
<Route path="/home" element={<UserRoute><Home /></UserRoute>} />
```

### 3. **Custom Hooks**

#### `useRole()` Hook

Check user role throughout your components:

```jsx
import { useRole } from "../hooks/useRole";

function MyComponent() {
  const { isAdmin, isUser, role, hasRole } = useRole();

  return (
    <>
      {isAdmin && <AdminSection />}
      {isUser && <UserSection />}
    </>
  );
}
```

**Available methods:**

- `role` - Current user's role string
- `isAuthenticated` - Is user logged in
- `isAdmin` - Is user an admin
- `isUser` - Is user a regular user
- `hasRole(role)` - Check specific role
- `hasAnyRole(['role1', 'role2'])` - Check if user has any of the roles
- `user` - Full user object

### 4. **Conditional Component Rendering**

#### `RoleBasedComponent.jsx`

Render content conditionally based on role:

```jsx
// Single role
<AdminOnly>
  <AdminFeature />
</AdminOnly>

// Multiple roles
<RoleBasedComponent requiredRole={['admin', 'moderator']}>
  <RestrictedContent />
</RoleBasedComponent>

// With fallback
<AdminOnly fallback={<AccessDenied />}>
  <AdminPanel />
</AdminOnly>
```

## Usage Examples

### Example 1: Admin-Only Navigation Item

```jsx
import { AdminOnly } from "./Component/RoleBasedComponent";

function Navbar() {
  return (
    <nav>
      <a href="/home">Home</a>
      <AdminOnly>
        <a href="/admin">Admin Panel</a>
      </AdminOnly>
    </nav>
  );
}
```

### Example 2: Conditional Dashboard Features

```jsx
import { useRole } from "../hooks/useRole";

function Dashboard() {
  const { isAdmin, isUser } = useRole();

  return (
    <div>
      <h1>Dashboard</h1>

      {isAdmin && (
        <>
          <AdminStats />
          <UserManagement />
        </>
      )}

      {isUser && (
        <>
          <UserStats />
          <MyApplications />
        </>
      )}
    </div>
  );
}
```

### Example 3: Dynamic Sidebar Based on Role

```jsx
import { useRole } from "../hooks/useRole";

function Sidebar() {
  const { isAdmin } = useRole();

  const menuItems = isAdmin ? adminMenuItems : userMenuItems;

  return (
    <aside>
      {menuItems.map((item) => (
        <NavLink key={item.id} to={item.path}>
          {item.label}
        </NavLink>
      ))}
    </aside>
  );
}
```

## File Structure

```
Client/src/
├── Component/
│   ├── ProtectedRoute/
│   │   └── ProtectedRoute.jsx (Enhanced with role checking)
│   └── RoleBasedComponent.jsx (New)
├── hooks/
│   └── useRole.js (New)
├── Providers/
│   └── AuthProvider.jsx (Enhanced with role)
├── Admin/ (Admin-specific components)
├── Pages/ (User-specific pages)
└── App.jsx (Updated with role-based routes)
```

## Role Assignment in Backend

Make sure your JWT token includes the role:

```javascript
// Backend example (Node.js)
const token = jwt.sign(
  {
    id: user._id,
    email: user.email,
    role: user.role, // "admin" or "user"
  },
  process.env.JWT_SECRET,
  { expiresIn: "7d" },
);
```

## Best Practices

1. **Always check role on backend** - Frontend is only for UX, backend must enforce permissions
2. **Use AdminOnly for UI elements** - Hide admin features from users
3. **Use AdminRoute for pages** - Prevent access to entire pages
4. **Use useRole hook** - For complex permission logic
5. **Keep roles simple** - Start with "admin" and "user", add more as needed
6. **Consistent role names** - Use same role strings throughout your app

## Troubleshooting

### User still sees admin content

- Check JWT token contains correct role
- Verify role is being extracted in AuthProvider
- Check browser console for decode errors

### Routes not protecting

- Ensure token is saved to localStorage
- Check that AdminRoute/UserRoute is wrapping the component
- Verify role name matches exactly ("admin" not "Admin")

### useRole returns null

- User might not be authenticated
- Token might have expired
- Check localStorage has valid token

## Migration Checklist

- [ ] Update AuthProvider with role extraction
- [ ] Update ProtectedRoute with role checking
- [ ] Create useRole hook
- [ ] Create RoleBasedComponent
- [ ] Update App.jsx routing
- [ ] Replace admin routes with AdminRoute wrapper
- [ ] Replace user routes with UserRoute wrapper
- [ ] Update components with AdminOnly/UserOnly
- [ ] Test admin access
- [ ] Test user access
- [ ] Test unauthorized redirects
