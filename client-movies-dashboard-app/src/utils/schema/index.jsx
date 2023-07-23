import * as YUP from "yup";

export const SUPPORTED_FORMAT = [
  "image/jpg",
  "image/jpeg",
  "image/gif",
  "image/png",
];
const FILE_SIZE = 4000;

export const addMovieSchema = YUP.object({
  movie_image_URI: YUP.mixed()
    .required("Please select a image")
    .nullable()
    .test(
      "fileFormat",
      "Unsupported Format",
      (value) => value && SUPPORTED_FORMAT.includes(value.type)
    ),
  movie_title: YUP.string()
    .min(1, "minium 1 character required")
    .required("Please add movie name"),
  movie_description: YUP.string()
    .min(5, "minium 5 character required")
    .required("Please add description"),
  rating: YUP.number().required("Please select rating"),
  genre: YUP.array()
    .min(1, "Please select atleast 1 genre")
    .required("Please Select genre"),
});
export const editMovieSchema = YUP.object({
  movie_title: YUP.string()
    .min(1, "minium 1 character required")
    .required("Please add movie name"),
  movie_description: YUP.string()
    .min(5, "minium 5 character required")
    .required("Please add description"),
  rating: YUP.number().required("Please select rating"),
  genre: YUP.array()
    .min(1, "Please select atleast 1 genre")
    .required("Please Select genre"),
});

export const addGenreSchema = YUP.object({
  title: YUP.string()
    .min(3, "Minimum 3 charector required")
    .required("Enter genre"),
});
