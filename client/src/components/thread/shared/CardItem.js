import React, { useContext, useRef, useState } from "react";

import { uic } from "../../../context";
import { IconExMark, IconMore } from "../../z_icons";
import { useClickOutSide } from "../../z_hooks/clickOutside.hook";
import { useDispatch } from "react-redux";
import {
  deleteComment,
  deleteReply,
} from "../../../store/actions/post/post.actions";

import ReactionCount from "./ReactionCount";
import Modal from "./Modal";
import EntryReplyView from "../thread.comments/EntryReplyView";
import { DeleteItems } from "./DeleteItems";
import ActionMenu from "./ActionMenu";
import Actions from "./Actions";
import { truncateString, displayBody } from "../../z_utils";

const CardItem = (props) => {
  const { uid } = useContext(uic);
  const isUser = uid === props.item.creatorId;
  const dispatch = useDispatch();
  const [TranString, setTranString] = useState(200);
  const [OptionsMenu, setOptionsMenu] = useState(false);
  const [showMore, setshowMore] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [pendingDeleteItem, setPendingDeleteItem] = useState(false);
  const wrapperRef = useRef(null);

  useClickOutSide(wrapperRef, () => setOptionsMenu(false));

  function showComfirmationModal() {
    setModalIsOpen(true);
    setOptionsMenu(false);
  }

  function handleCloseModal() {
    setModalIsOpen(false);
    setPendingDeleteItem(false);
  }
  function resetComfirmationModal() {
    setModalIsOpen(false);
    setPendingDeleteItem(false);
  }

  function truncate(string) {
    if (!string) return;
    if (string.length > TranString) {
      if (!(string.length < TranString)) {
        return (
          <span
            className=" font-bold hover:underline cursor-pointer"
            onClick={() => setTranString(TranString + 400)}
          >
            show more
          </span>
        );
      }
    }
  }

  async function deleteItem() {
    setPendingDeleteItem(true);
    if (props.mode === "comment") {
      await dispatch(deleteComment(props.item._id, props.postId));
      resetComfirmationModal();
    }

    if (props.mode === "reply") {
      await dispatch(
        deleteReply(props.commentId, props.item._id, props.postId)
      );
      resetComfirmationModal();
    }
  }

  const itemContentStyle = `${!props.item.isReady && "opacity-60"} 
                  ${props.item.isError && "border border-red-500"}  
                  inline-flex relative   rounded-xl bg-white mr-4`;
  return (
    <div className=" relative">
      <div
        onMouseOver={() => setshowMore(true)}
        onMouseLeave={() => setshowMore(false)}
        className={`relative ${props.mode === "reply" ? "pl-12" : ""} `}
      >
        <div className="flex items-center leading-tight">
          <div className="flex leading-tight">
            <div className="flex items-start  w-full leading-tight">
              <div className=" w-14 relative">
                <img
                  alt="blog"
                  src="https://dummyimage.com/103x103"
                  className={`${props.mode === "reply" && "w-7 h-7"} ${
                    props.mode === "comment" && "w-8 h-8"
                  } mx-2 mt-1  relative rounded-full flex-shrink-0 object-cover object-center`}
                />
                {props.item.isError && (
                  <div className=" ease-in-out duration-500 hover:opacity-75 cursor-pointer absolute top-4 left-4 rounded-full bg-gray-50 p-1 ">
                    <IconExMark
                      classes=" fill-current text-red-500"
                      width="17"
                      height="17"
                    />
                  </div>
                )}
              </div>
              <div className="flex w-full">
                <div>
                  <div
                    style={{ backgroundColor: "#f0f2f5" }}
                    className={itemContentStyle}
                  >
                    <div className="flex py-2 px-4 flex-col">
                      <p
                        style={{ fontSize: "14px", wordBreak: "break-word" }}
                        className="text-black mb-0 leading-tight"
                      >
                        <span className=" font-bold">
                          @{props.item.creator}
                        </span>
                        <span
                          dangerouslySetInnerHTML={truncateString(
                            displayBody(props.item.body)
                          )}
                          className="px-1"
                        ></span>
                        {truncate(props.item.body)}
                      </p>
                    </div>

                    <ReactionCount
                      isLiked={props.item.isLiked}
                      likesCount={props.item.likesCount}
                      isError={props.item.isError}
                    />
                  </div>
                  <Actions
                    handleShowReplyForm={() => setShowReplyForm(true)}
                    mode={props.mode}
                    postId={props.postId}
                    item={props.item}
                  />
                </div>
              </div>
            </div>
          </div>
          <div ref={wrapperRef} className="relative w-8 h-8  mb-4">
            <div className=" w-8 h-8 ">
              {showMore && props.item.isReady && (
                <button
                  onClick={() => setOptionsMenu((OptionsMenu) => !OptionsMenu)}
                  type="button"
                  className="active:bg-gray-200 focus:outline-none hover:bg-gray-100 rounded-full"
                >
                  <IconMore
                    classes="ease-in-out duration-500"
                    circle={false}
                    height="26"
                    width="26"
                  />
                </button>
              )}
            </div>
            <ActionMenu
              isOpen={OptionsMenu}
              isReady={props.item.isReady}
              isError={props.item.isError}
              isUser={isUser}
              handleShowComfirmationModal={(e) => showComfirmationModal(e)}
            />
          </div>
        </div>
      </div>

      <EntryReplyView
        mode={props.mode}
        replies={props.item.replies}
        commentId={props.item._id}
        postId={props.postId}
        showReplyForm={showReplyForm}
      />

      <Modal mode={props.mode} isOpen={modalIsOpen}>
        <DeleteItems
          handleDeleteItem={deleteItem}
          pendingDeleteItem={pendingDeleteItem}
          handleCloseModal={() => handleCloseModal()}
        />
      </Modal>
    </div>
  );
};

export default CardItem;
