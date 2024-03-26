export default function embedYoutubeVideo(youtubeUrl) {
    const extractVideoId = (url) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        if (match && match[2].length === 11) {
            return match[2];
        } else {
            console.error("Invalid YouTube URL");
            return null;
        }
    };

    const videoId = extractVideoId(youtubeUrl);
    if (!videoId) return '';

    const embedUrl = `https://www.youtube.com/embed/${videoId}`;

    return embedUrl;
}