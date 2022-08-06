declare module 'react-grid-gallery' {
	type Image = {
		src: string;
		thumbnail: string;
		thumbnailWidth: number;
		thumbnailHeight: number;
		isSelected: boolean;
		caption: string;
	};
	type GalleryComponents = {
		images: Image[];
	};

	const Gallery = (_: GalleryComponents): JSX.Element => {};
	export = Gallery;
}
