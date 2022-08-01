# Custom YouTube Player for React 
A custom wrapper for YouTube iframe embeds.  
Prevents access to the embedded player controls and other options such as the `Share` and `Add to Watch Later` buttons.  
  
Useful for displaying YouTube videos via iframe embeds but restricting acceess to the video URL.  
Example: view unlisted videos and prevent access to the video URL/id via the share button.  

## How does it work?  
A simple `div` overlay with custom controls over the iframe embed.

The custom controls provides access to the video playback (via the YouTube Player API) instead of directly interacting with the embedded player.  

## Dependencies 

1. react. 
2. react-youtube. 
3. tailwind.
4. heroicons
5. vite.  

## Installation/Testing 
```
> git clone https://github.com/stravo1/react-yt-player.git
> npm run install
> npm run dev
```
