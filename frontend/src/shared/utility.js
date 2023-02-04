export const updateObject = (oldObject, updatedProperties) => {
	const updated = {
		...oldObject,
		...updatedProperties,
	};
	return updated;
};

export const uploadImage = (imageFile) => {
	const data = new FormData();
	data.append("file", imageFile);
	data.append("upload_preset", "itlab_image_store_preset");
	data.append("cloud_name", "dl8hmamey");
	fetch("  https://api.cloudinary.com/v1_1/dl8hmamey/image/upload", {
		method: "post",
		body: data,
	})
		.then((resp) => resp.json())
		.then((data) => {
			return data.url;
		})
		.catch((err) => console.log(err));
};

