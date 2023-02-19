import React, { useEffect, useState, useRef, useMemo } from "react";
import { useCreateAsset, useUpdateAsset, Player } from "@livepeer/react";
import { FaCloudUploadAlt } from "react-icons/fa";
import fileReaderStream from "filereader-stream";
import { topics } from "@/utils/const";
import Asset from "@/components/VideoUpload/Asset";
import LensSteps from "@/components/VideoUpload/LensSteps";
import BundlrUpload from "@/components/VideoUpload/BundlrUpload";
import {
  useAppStore,
  UPLOADED_VIDEO_FORM_DEFAULTS,
  UPLOADED_VIDEO_BUNDLR_DEFAULTS,
} from "@/store/app";

import toast from "react-hot-toast";

import Collect from "@/components/VideoUpload/Collect";
import { getCollectModule } from "@/utils/getCollectModule";

import { Spinner } from "../UI/Spinner";

const UploadVideo = () => {
  const ref = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [videoAsset, setVideoAsset] = useState<File | null>(null);
  const [wrongFileType, setWrongFileType] = useState(false);
  const currentUser = useAppStore((state) => state.currentProfile);
  const uploadedVideo = useAppStore((state) => state.uploadedVideo);
  const setUploadedVideo = useAppStore((state) => state.setUploadedVideo);
  const setBundlrData = useAppStore((state) => state.setBundlrData);
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(topics[0].name); //this is a placeholder for now

  const {
    mutate: createAsset,
    data: assets,
    progress,
    isSuccess,
    error,
  } = useCreateAsset(
    videoAsset
      ? { sources: [{ name: videoAsset.name, file: videoAsset }] }
      : null
  );

  console.log("Current User is", currentUser);

  console.log("COLLECT MODULE", uploadedVideo.collectModule);
  useEffect(() => {
    console.log(getCollectModule(uploadedVideo.collectModule));
  });
  const resetToDefaults = () => {
    setUploadedVideo(UPLOADED_VIDEO_FORM_DEFAULTS);
    setBundlrData(UPLOADED_VIDEO_BUNDLR_DEFAULTS);
    setTitle("");
    setDescription("");
    setVideoAsset(null);
  };

  useEffect(() => {
    if (uploadedVideo.isIndexed) {
      resetToDefaults();
    }
  }, [uploadedVideo.isIndexed]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const previewURL = URL.createObjectURL(file);
      setVideoAsset(file);
      setUploadedVideo({ preview: previewURL });
    } else {
      return;
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    console.log("Video File", videoAsset);
    if (!videoAsset) {
      toast.error("Please select a video!");
      return;
    }
    if (videoAsset) {
      const preview = URL.createObjectURL(videoAsset);
      const stream = fileReaderStream(videoAsset);
      console.log("Stream", stream);
      setUploadedVideo({
        stream: stream,
        preview: preview,
        videoType: videoAsset.type || "video/mp4",
        title: title,
        description: description,
        category: category,
        isUploadToAr: true,
        buttonText: "Upload Video",
      });
      toast.success(
        "Please sign with your wallet to check you storage balance on Bundlr and if necessary fund it with some Matic."
      );
    }

    if (error) console.log("Error", error);
  };

  return (
  <div className='flex w-full absolute left-0 pt-10 lg:pt-5 bg-[#F8F8F8] justify-center'>
  <div className=' bg-white rounded-lg flex gap-6 flex-wrap justify-center items-center p-14 pt-6 md:mb-10 '>
         
          <div className="md:object-contain md:h-full">
              <div>
               <p className='text-2xl font-bold'>Upload Video</p>
               <p className='text-md text-gray-400 mt-1'>Post a video to your account</p>
              </div>
              <div className="w-[250px] flex-shrink-0 border-2 border-gray-300 rounded
                 border-dashed flex flex-col items-center p-8 mt-8 transition cursor-pointer
                  hover:border-red-300 hover:bg-gray-100">
                  {isLoading ? (
                      <p>Uploading....</p>
                  ) : (
                      <div>
                        {videoAsset ? (
                          <div>
                            {uploadedVideo.preview && (
                               <video
                               className="w-[250px] h-[240px] border-2 border-black"
                                muted
                                autoPlay
                                controls
                                title={videoAsset?.name}
                                src={uploadedVideo.preview}
                                playsInline
                               >
                               </video>
                               )}
                          </div>
                        ) : (
                          <label className='cursor-pointer'>
                              <div className='flex flex-col items-center justify-center'>
                                <div className='flex flex-col justify-center items-center'>
                                  <p className='font-bold text-xl'>
                                    <FaCloudUploadAlt className='text-gray-300 text-6xl' />
                                  </p>
                                  <p className='text-xl rounded-full font-semibold'>
                                      Upload Video
                                  </p>
                                </div>

                                <p className='text-gray-400 text-center mt-10 text-sm leading-10'>
                                  MP4 or WebM or ogg <br/>
                                  Make it short <br />
                                </p>
                                <p className="w-full rounded-full bg-blue-700 text-white p-2 text-center">
                                  Select File
                                </p>
                              </div>
                               <input 
                               ref={ref}
                               type='file' accept='video/mp4,video/x-m4v,video/*'
                               name='upload-video'
                               className='hidden'
                               onChange={onChange}
                               required
                               >
                               </input>
                          </label>
                        )}
                      </div>
                  )}
                  {wrongFileType && (
                      <p className='text-center text-xl text-red-400 font-semibold mt-4 w-[250px]'
                      >Please select a video file</p>
                  )}
              </div>
              <div className="mt-4">
              <Collect />
              </div>
          </div>
          
           {/* //start form// */}
           <form onSubmit={handleSubmit} >
          <div className='flex flex-col gap-3 pb-10'>
                   <label className='text-md font-medium'>Title</label>
                  <input
                  type='text'
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className='rounded lg:after:w-650 outline-none text-md border-2 border-gray-200 p-2'
                  ></input>

                  <label className='text-md font-medium'>Description</label>
                  <input
                  type='text'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className='rounded lg:after:w-650 outline-none text-md border-2 border-gray-200 p-2'
                  ></input>

                  <label className='text-md font-medium'>Choose a Category</label>
                  <select
                  onChange={(e) => setCategory(e.target.value)}
                  className='outline-none border-2 border-gray-200 text-md capitalize lg:p-4 p-2 rounded cursor-pointer'
                  >
                    {topics.map((topic) => (
                      <option
                      key={topic.name}
                      className='outline-none capitalize bg-white text-gray-700 text-md p-2 hover:bg-slate-300'
                      value={topic.name}
                      >
                        {topic.name}
                      </option>
                     ))};
                  </select>
          

                  {uploadedVideo.stream && <BundlrUpload />}
          <div className="flex gap-6 mt-10">
            <button
              onClick={resetToDefaults}
              type="button"
              className="border-gray-300 border-2 text-md font-medium p-2 rounded-full w-28 lg:w-44 outline-none"
            >
              {" "}
              Discard
            </button>
            {uploadedVideo.title &&
            uploadedVideo.description &&
            uploadedVideo.stream ? (
              <button
                type="button"
                className="bg-blue-700 text-white text-md font-medium p-2 rounded w-28 lg:w-44 outline-none"
                disabled={uploadedVideo.loading}
              >
                <div className="flex justify-around">
                  <div>
                    <LensSteps />
                  </div>
                  {uploadedVideo.loading && (
                    <div>
                      <Spinner />
                    </div>
                  )}
                </div>
              </button>
            ) : (
              <div>
                <button
                  type="submit"
                  className="bg-blue-700 text-white text-md font-medium p-2 rounded-full w-28 lg:w-44 outline-none"
                >
                  Connect to Bundlr
                </button>
              </div>
            )}
          </div>
              
              </div>
              </form>
      </div>
  </div>
);
};

export default UploadVideo;