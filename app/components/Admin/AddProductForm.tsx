"use client";

import Input from "@/app/components/Inputes/Input";
import TextArea from "@/app/components/Inputes/TextArea";
import CustomCheckbox from "@/app/components/Inputes/CustomCheckbox";
import Heading from "@/app/components/sharedComponent/Header";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { categories } from "@/app/utils/categories";
import CategoryInput from "@/app/components/Inputes/CategoryInput";
import { colors } from "@/app/utils/colors";
import SelectColor from "@/app/components/Inputes/SelectColor";
import { useCallback, useEffect, useState } from "react";
import { ImageType, UplodedImageType } from "../../admin/add-products/types";
import ButtonComp from "@/app/components/sharedComponent/ButtonComp";
import toast from "react-hot-toast";
import { useLoading } from "@/app/hooks/useLoading";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import firebaseApp from "@/libs/firebase";
import axios from "axios";
import { useRouter } from "next/navigation";

const AddProductForm = () => {
  const filteredCategories = categories.filter(
    (category) => category.label !== "All"
  );
  const router = useRouter();
  const { isLoading, startLoading, stopLoading } = useLoading();
  const [images, setImages] = useState<ImageType[] | null>(null);
  const [isProductCreated, setIsProductCreated] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      description: "",
      brand: "",
      category: "",
      inStock: false,
      images: [],
      price: "",
    },
  });
  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldValidate: true,
      shouldTouch: true,
    });
  };
  useEffect(() => {
    setCustomValue("images", images);
  }, [images]);
  useEffect(() => {
    reset();
    setImages(null);
    setIsProductCreated(false);
  }, [isProductCreated]);
  const category = watch("category");
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    startLoading();
    let uploadedImages: UplodedImageType[] = [];
    if (!data.category) {
      stopLoading();
      return toast.error("Category is not selected");
    }
    if (!data.images || data.images.length == 0) {
      stopLoading();
      toast.error("No images selected");
    }
    const handleUploadImages = async () => {
      toast("Creating product plaese wait...");
      try {
        for (const item of data.images) {
          if (item && item.url) {
            const fileName = new Date().getTime() + "-" + item.url.name;
            const storage = getStorage(firebaseApp);
            const storageRef = ref(storage, `products/${fileName}`);
            const uploadTask = uploadBytesResumable(storageRef, item.url);
            await new Promise<void>((resolve, reject) => {
              uploadTask.on(
                "state_changed",
                (snapshot) => {
                  const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                  console.log("Upload is " + progress + "% done");
                  switch (snapshot.state) {
                    case "paused":
                      console.log("Upload is paused");
                      break;
                    case "running":
                      console.log("Upload is running");
                      break;
                  }
                },
                (error) => {
                  reject(error);
                },
                () => {
                  getDownloadURL(uploadTask.snapshot.ref)
                    .then((downloadURL) => {
                      stopLoading();
                      uploadedImages.push({ ...item, url: downloadURL });
                      console.log("File available at", downloadURL);
                      resolve();
                    })
                    .catch((err) => {
                      console.log("Error getting the download url" + err);
                      reject(err);
                    });
                }
              );
            });
          }
        }
      } catch (error) {
        stopLoading();
        console.log("Error handling Images upload" + error);
        toast.error("Error handling Images upload");
      }
    };
    await handleUploadImages();
    const productDa = { ...data, images: uploadedImages };
    axios
      .post("/api/product", productDa)
      .then(() => {
        toast.success("Product Created");
        setIsProductCreated(true);
        router.push("/admin/manage-products")
        router.refresh();
      })
      .catch((err) => {
        toast.error("Something went wrong ");
      }).finally(() => {stopLoading() });
  };
  const addImageToState = useCallback((value: ImageType) => {
    setImages((prev) => {
      if (!prev) return [value];
      return [...prev, value];
    });
  }, []);
  const removeImageFromState = useCallback((value: ImageType) => {
    setImages((prev) => {
      if (prev) {
        const filteredImages: any = images?.filter(
          (image) => image.color !== value.color
        );
        return filteredImages;
      }
      return prev;
    });
  }, []);
  return (
    <>
      <Heading title="Add Product" />
      <Input
        id="name"
        label="Product Name"
        // disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="price"
        label="Product Price"
        disabled={isLoading}
        register={register}
        errors={errors}
        type="number"
        required
      />
      <Input
        id="brand"
        label="Product Brand"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <TextArea
        id="description"
        label="Product Description"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <CustomCheckbox
        id="inStock"
        register={register}
        label="This product is in Stock"
      />
      <div className="w-full font-medium">
        <div className="mb-4 font-semibold">Select a Categorey</div>
        <div className=" grid grid-cols-2 md:grid-cols-3 gap-3 max-h-[50vh] overflow-y-auto">
          {filteredCategories.map((item) => {
            if (item.label === "Other Accessories") return null;

            return (
              <div key={item.id} className="col-span">
                <CategoryInput
                  onClick={(category) => setCustomValue("category", category)}
                  label={item.label}
                  icon={item.Icon}
                  selected={category === item.label}
                />
              </div>

            );
          })}
        </div>
      </div>

      <div className="w-full flex flex-col flex-wrap gap-4">
        <div>
          <div className="font-bold">
            Select the available products colors and upload thier images
          </div>
          <div className="text-sm">
            You must upload an image for each of the color selected otherwise
            the color selection will be ignored
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 ">
          {colors.map((item, index) => (
            <SelectColor
              key={index}
              item={item}
              addImageToState={addImageToState}
              removeImageFromState={removeImageFromState}
              isProductCreated={false}
            />
          ))}
        </div>
      </div>
      <ButtonComp
        label={isLoading ? "loading..." : "Add Product"}
        onClick={handleSubmit(onSubmit)}
        custom="mt-10"
      />
    </>
  );
};

export default AddProductForm;
