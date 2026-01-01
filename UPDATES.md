# Updates and Improvements

This document describes the updates and improvements made to the rartracker codebase.

## Build System Updates

### Dependencies Updated
- **Gulp**: Upgraded from 3.9.0 to 4.0.2
- **Babel**: Upgraded from 6.x to 7.x
  - `babel-core` → `@babel/core`
  - `babel-preset-es2015` → `@babel/preset-env`
- Updated other dev dependencies to compatible versions

### Gulpfile Modernization
- Migrated from Gulp 3 to Gulp 4 syntax
- Replaced deprecated array dependencies with `gulp.series()` and `gulp.parallel()`
- Updated Babel preset from `'es2015'` to `'@babel/preset-env'`
- Fixed `copy-fonts` task to work properly with Gulp 4

## PHP Security & Compatibility Fixes

### PHP 8.2 Compatibility
- **Dynamic Properties**: Added property declarations in `api/User.php` to fix deprecated dynamic property warnings
  - Added: `$db`, `$ip`, `$email`, `$indexList`, `$uplLastReadCommentId`, `$last_bevakabrowse`, `$age`, `$bonus`, `$requestSlots`, `$invites`, `$https`, `$passkey`, `$lastAccess`, `$leechStart`, `$lastreadnews`, `$language`
- **Undefined Array Keys**: Fixed `api/LoginAttempts.php` to use `??` operator instead of `?:` for proper null coalescing
- **Locale File Path**: Fixed `api/L.php` to use `__DIR__` for correct relative path resolution
- **Null Array Access**: Added proper null checking and error handling in `api/L.php` for locale file loading
- **bindParam Reference**: Fixed `api/SqlErrors.php` to store method return value in variable before passing to `bindParam()`
- **SQL GROUP BY**: Fixed MySQL 5.7+ strict mode compatibility in `api/User.php` by including all selected columns in GROUP BY clause

### Deprecated Function Fixes
- **`__autoload()`**: Replaced with `spl_autoload_register()` in `api/api-v1.php` (PHP 7.2+ compatible)
- **String comparison**: Changed `strpos() > -1` to `!== false` in `tracker.php` and `api/Torrent.php`

### Security Improvements
- **SQL Injection Fix**: Fixed vulnerability in `api/SqlErrors.php` by replacing string concatenation with prepared statements
- **Error Handling**: Improved error checking for file operations and HTTP requests

### Code Quality
- Removed unnecessary `execute()` call in `api/Faq.php`
- Improved error handling in `api/Helper.php` and `api/MovieData.php`
- Added proper URL encoding for external API calls

## Files Modified

1. `package.json` - Updated dependencies
2. `gulpfile.js` - Migrated to Gulp 4
3. `tracker.php` - Fixed deprecated patterns
4. `api/api-v1.php` - Fixed deprecated `__autoload()` and memcached initialization
5. `api/Torrent.php` - Fixed string comparison
6. `api/Faq.php` - Removed unnecessary execute
7. `api/SqlErrors.php` - Fixed SQL injection vulnerability and bindParam reference issue
8. `api/Helper.php` - Improved HTTP request handling
9. `api/MovieData.php` - Improved file operation error handling
10. `api/User.php` - Added property declarations and fixed GROUP BY clause for PHP 8.2 compatibility
11. `api/LoginAttempts.php` - Fixed undefined array key access for PHP 8.2 compatibility
12. `api/L.php` - Fixed locale file path and null handling for PHP 8.2 compatibility
13. `api/Statistics.php` - Fixed peers record handling for PHP 8.2 compatibility
14. `app/polls/polls.resources.js` - Added error handling and transformResponse
15. `app/start/start.controller.js` - Improved error handling and array initialization
16. `app/start/start.resources.js` - Added transformResponse and error callbacks
17. `app/torrent/torrent.resources.js` - Comprehensive error handling for API calls
18. `app/torrents/torrents.controller.js` - Added array initialization
19. `app/services/auth.service.js` - Improved promise handling and logout flow
20. `css/rartracker.css` - Complete modern redesign with CSS custom properties
21. `app/admin/admin-dashboard/admin-dashboard.controller.js` - New admin dashboard controller
22. `app/admin/admin-dashboard/admin-dashboard.template.html` - New admin dashboard template
23. `app/admin/admin.routes.js` - Added admin dashboard route
24. `app/header/main-menu.template.html` - Updated navigation with Admin Panel link

## UI/UX Modernization (January 2026)

### Complete Design System Redesign
- **CSS Custom Properties**: Implemented comprehensive modern design system with CSS variables for consistent theming
- **Modern Color Palette**: Added gradient-based color scheme with consistent theming throughout the application
- **Typography Improvements**: Enhanced font sizes, weights, and line heights for better readability
- **Navigation Redesign**: Modernized navbar with smooth hover effects and improved styling
- **Card & Panel Enhancements**: Added gradient headers and hover animations to cards and panels
- **Button Modernization**: Redesigned buttons with gradients, improved focus states, and smooth transitions
- **Form Improvements**: Enhanced input styling with better focus indicators and modern appearance
- **Table Enhancements**: Added gradient headers and hover effects on table rows
- **Responsive Design**: Comprehensive responsive design improvements for all screen sizes
- **Animations**: Implemented smooth animations and transitions throughout the interface
- **Backward Compatibility**: Preserved all existing CSS classes to maintain compatibility with existing code

### Admin Dashboard
- **New Admin Dashboard**: Added categorized admin dashboard with organized admin functions
- **Consolidated Admin Menu**: Unified admin menu into single "Admin Panel" link in main navigation
- **Improved Admin Navigation**: Better organization and access to admin features

## Additional PHP 8.2 Compatibility Fixes (January 2026)

### Additional Compatibility Updates
- **Memcached Initialization**: Fixed memcached initialization issues in `api/api-v1.php`
- **Array Access Checks**: Added proper array checks for `getCustomIndex` method
- **Statistics Peers Record**: Fixed handling of peers record in `api/Statistics.php` to prevent undefined errors

## Frontend Error Handling Improvements (January 2026)

### AngularJS API Error Handling
- **Transform Response**: Added `transformResponse` to handle HTML error messages and invalid JSON responses
- **Error Callbacks**: Implemented comprehensive error callbacks in controllers to prevent frontend crashes
- **JSON Parse Errors**: Added handling for JSON parse errors when API returns HTML responses (e.g., when user is not logged in)
- **Resource Configuration**: Fixed `$resource:badcfg` errors by properly configuring resource responses
- **Array Initialization**: Added array initialization to prevent undefined errors in controllers

### Authentication Service Updates
- **Promise Handling**: Improved promise resolution in `auth.service.js` to prevent routes from hanging
- **Logout Flow**: Enhanced logout flow to properly resolve promises before redirecting
- **Error State Management**: Better handling of authentication errors and state transitions

## Impact

- **Security**: Fixed SQL injection vulnerability and improved error handling
- **Compatibility**: Code now works with PHP 7.2+ and PHP 8.2+ (fully compatible with modern PHP versions)
- **PHP 8.2**: All deprecation warnings resolved, application fully compatible with PHP 8.2
- **Build System**: Modern build tools compatible with latest Node.js versions
- **Maintainability**: Updated to modern build tools and coding standards
- **Stability**: Improved error handling prevents potential runtime errors
- **User Experience**: Modern, polished interface with smooth animations and consistent design
- **Frontend Stability**: Improved error handling prevents frontend crashes from API errors
- **Admin Experience**: Better organized admin interface with dedicated dashboard
- **Reliability**: Enhanced authentication flow prevents hanging routes and improves user experience

## Next Steps

After these updates, you should:
1. Run `npm install` to install updated dependencies
2. Test the build process with `npm run dist`
3. Verify all functionality works as expected
4. Test the new admin dashboard and navigation
5. Verify error handling works correctly when not logged in
