# Virtualized Masonry Grid

## Getting started

To run the application 

1. Generate API_KEY at https://pexels.com

2. Create `.env.local` file and add `VITE_PEXELS_API_KEY` environment variable

   ```
   VITE_PEXELS_API_KEY=<your-api-key>
   ```

3. Run the following commands
    
   ```
   npm run install
   npm run build
   npm run preview
   ```

## Masonry algorithm

1. Based on predefined column width and window width determine an amount of columns
2. Iteratively place masonry items in the shortest column up to that point
3. Skip rendering an item which is not intersect with the viewport (including pre-defined threshold).

## Performance measurements

Lighthouse results with production build in local environment (w/o any extension enabled)

IMAGE and Report attached

## Design and styling

Styling is kept minimal and is applied solely for layout purposes.

## Implemented features

- Virtualized responsive masonry grid layout
- Photo preview with additional details (Photographer, Description)
- Search by keywords
- Load more photos

