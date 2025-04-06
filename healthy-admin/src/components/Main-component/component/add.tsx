import { useState } from "react";
import Image from "next/image";
import axios from "axios";
import {
  Wrapper,
  UploadLabel,
  HiddenInput,
  PreviewWrapper,
} from "@/components/Main-component/style/ad-styled";

const AdBanner = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleUpload = async () => {
    if (!file) return alert("이미지를 선택해주세요.");

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post(
        "http://localhost:5001/ad/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true, //headers 타입이 지정되어있으면 아마 추가를 해줘야 하는듯
        }
      );

      alert("업로드 성공: " + res.data.filename);
    } catch (err) {
      console.error(err);
      alert("업로드 실패");
    }
  };

  return (
    <Wrapper>
      <UploadLabel htmlFor="ad-upload">광고 이미지 선택</UploadLabel>
      <HiddenInput
        type="file"
        id="ad-upload"
        accept="image/*"
        onChange={handleFileChange}
      />

      {preview && (
        <PreviewWrapper>
          <Image
            src={preview}
            alt="광고 미리보기"
            layout="fill"
            objectFit="cover"
          />
        </PreviewWrapper>
      )}

      <UploadLabel as="button" onClick={handleUpload}>
        업로드
      </UploadLabel>
    </Wrapper>
  );
};

export default AdBanner;
