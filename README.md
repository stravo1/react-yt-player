# Custom YouTube Player for React 
A custom wrapper for YouTube iframe embeds.  
Prevents access to the embedded player controls and other options such as the `Share` and `Add to Watch Later` buttons.  
  
Useful for displaying YouTube videos via iframe embeds but restricting acceess to the video URL.  
Example: view unlisted videos and prevent access to the video URL/id via the share button.  

## How does it work?  
A complete `div` overlay restricts any access to the iframe embed.

The custom controls provides access to the video playback (via the YouTube Player API) instead of direct access to the embedded player.  

## Dependencies 

1. [react](https://reactjs.org/)
2. [react-youtube](https://www.npmjs.com/package/react-youtube)
3. [tailwind](https://tailwindcss.com/docs/guides/vite)
4. [heroicons](https://heroicons.com/)
5. [vite](https://vitejs.dev/)

## Installation/Testing 
```bash
git clone https://github.com/stravo1/react-yt-player.git
cd react-yt-player
npm install
npm run dev
```
