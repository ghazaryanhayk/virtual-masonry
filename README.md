# Virtualized Masonry Grid

## Getting started

To run the application 

1. Generate API_KEY at https://pexels.com

2. Create `.env.local` file and add the `VITE_PEXELS_API_KEY` environment variable

   ```
   VITE_PEXELS_API_KEY=<your-api-key>
   ```

3. Run the following commands
    
   ```
   npm install
   ```
   ```
   npm run build
   ```
   ```
   npm run preview
   ```

## Masonry algorithm

1. Based on predefined column width and window width determine the amount of columns
2. Iteratively place masonry items in the shortest column up to that point
3. Skip rendering an item that does not intersect with the viewport (including the pre-defined threshold).

## Performance measurements

Lighthouse results with production build in the local environment (w/o any extension enabled)

IMAGE and Report attached
![image](https://github.com/user-attachments/assets/7c2d45da-afd4-4ba4-8494-9e9b5c54ad2b)

Find the report summary attached:
[Lighthouse_Report.pdf](https://github.com/user-attachments/files/17592719/Lighthouse_Report.pdf)

## Design and styling

Styling is kept minimal and is applied solely for layout purposes.

## Implemented features

- Virtualized responsive masonry grid layout
- Photo preview with additional details (Photographer, Description)
- Search by keywords
- Load more photos

