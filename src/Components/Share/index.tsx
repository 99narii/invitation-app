import React from "react";
import './style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare } from "@fortawesome/free-solid-svg-icons";
import ToastNotification from "../Modal";
import {
  KAKAOTALK_API_TOKEN,
  KAKAOTALK_SHARE_IMAGE,
  WEDDING_INVITATION_URL,
  GROOM_NAME,
  BRIDE_NAME,
} from "../../config";

const Share = () => {
  const { showToast } = ToastNotification();
  const copyShare = () => {
    const url = window.location.href; 
      navigator.clipboard.writeText(url)
        .then(() => {
          showToast('링크가 복사되었습니다.', '#9b819b');
        })
        .catch(err => {
          console.error('링크 복사 실패');
        });
    };

//   const createKakaoButton = () => {
//     // kakao sdk script이 정상적으로 불러와졌으면 window.Kakao로 접근이 가능합니다
//     if (window.Kakao) {
//       const kakao = window.Kakao;

//       // 중복 initialization 방지
//       if (!kakao.isInitialized()) {
//         // 두번째 step 에서 가져온 javascript key 를 이용하여 initialize
//         kakao.init(KAKAOTALK_API_TOKEN);
//       }

//       kakao.Link.createDefaultButton({
//         objectType: "feed",
//         container: "#sendKakao",
//         content: {
//           title: `${GROOM_NAME}❤${BRIDE_NAME} 결혼식에 초대합니다`,
//           description: "아래의 '청첩장 열기' 버튼을 눌러 읽어주세요🤵👰",
//           imageUrl: KAKAOTALK_SHARE_IMAGE,
//           link: {
//             mobileWebUrl: window.location.href,
//             webUrl: window.location.href,
//           },
//         },
//         buttons: [
//           {
//             title: "청첩장 열기",
//             link: {
//               mobileWebUrl: window.location.href,
//               webUrl: window.location.href,
//             },
//           },
//         ],
//         installTalk: true,
//       });

//       setTimeout(() => {
//         document.getElementById("sendKakao")?.click();
//         message.success("카카오톡으로 청첩장을 공유합니다!");
//       }, 100);
//     }
//   };

  return (
    <>
        <div className="share">
          <button type="button" className="share_btn" onClick={copyShare}>
          <FontAwesomeIcon icon={faShare} />

            공유하기</button>
        </div>
    </>
  );
};

export default Share;
