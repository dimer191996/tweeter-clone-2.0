import React from "react";
import { IconImage, IconMic } from "../../z_icons";
import FlexWrapper from "./FlexWrapper";
import PActionButton from "./PActionButton";

const AddPostWithOptions = (props) => {
  return (
    <FlexWrapper border="none" mx="0" position="center" div2="flex mb-1">
      <PActionButton
        handleChange={props.handleChange}
        type="primary-upload"
        lable="Photo/Video"
      >
        <IconImage />
      </PActionButton>
      <PActionButton lable="Voice/Audio">
        <IconMic />
      </PActionButton>
    </FlexWrapper>
  );
};

export default AddPostWithOptions;
