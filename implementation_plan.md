# Move Feedback to Sidebar

## Goal Description
Move the access point for the Feedback page from the Pomodoro Timer header to the main application Sidebar/Navigation menu, as requested by the user.

## Proposed Changes

### Components
#### [MODIFY] [src/app/(app)/layout.tsx](file:///c:/Apps/NEETrack/NEETrack/src/app/(app)/layout.tsx)
*   **Action**: Add "Feedback" link to `DashboardNav` (both desktop and mobile menus).
*   **Icon**: `MessageSquare`.
*   **Link**: `/feedback`.

#### [MODIFY] [src/components/pomodoro-timer.tsx](file:///c:/Apps/NEETrack/NEETrack/src/components/pomodoro-timer.tsx)
*   **Action**: Remove the temporary Feedback button (MessageSquare icon) from the header.

## Verification Plan
1.  **Sidebar**: Verify "Feedback" appears in the main menu.
2.  **Navigation**: Click "Feedback" in sidebar -> Go to `/feedback`.
3.  **Cleanup**: Verify the icon is gone from the Pomodoro Timer card.
