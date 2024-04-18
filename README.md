# 요리조리 / 레시피 공유 커뮤니티

1인가구 비율 2022년 기준 34.5%로 약 20%가 증가, 추가적인 경제적인 문제로 인한 물가 상승 및 배달비 증가로 인해 스스로 혼자 요리를 하고싶어 하는 사람들을 위한 커뮤니티

### 프로젝트 세부내용


### 프로젝트 세부내용
[블로그 참고]
<a href="https://blog.naver.com/mingcoding" target="_blank"><img src="https://img.shields.io/badge/N-naverBlog%20-%20naverblog" /></a>

## 개발 Stack

- React (v18.2.0)
- vite (v5.0.11)

## 실행 전 준비사항

※ 모든 버전은 프로젝트 개시 당시 버전

1. Node.js 설치

- 버전: v21.1.0

  2.npm 설치

- 버전: v10.2.0

## 프로젝트 실행

```bash
#프로젝트 구성요소 설치
npm install

#ckEditor 정보
npm install @ckeditor/ckeditor5-autoformat 40.2.0
npm install @ckeditor/ckeditor5-basic-styles 40.2.0
npm install @ckeditor/ckeditor5-block-quote 40.2.0
npm install @ckeditor/ckeditor5-build-classic 41.0.0
npm install @ckeditor/ckeditor5-cloud-services 40.2.0
npm install @ckeditor/ckeditor5-essentials 40.2.0
npm install @ckeditor/ckeditor5-font 40.2.0
npm install @ckeditor/ckeditor5-horizontal-line 40.2.0
npm install @ckeditor/ckeditor5-image 40.2.0
npm install @ckeditor/ckeditor5-indent 40.2.0
npm install @ckeditor/ckeditor5-link 40.2.0
npm install @ckeditor/ckeditor5-list 40.2.0
npm install @ckeditor/ckeditor5-paste-from-office 40.2.0
npm install @ckeditor/ckeditor5-react 6.2.0

#local test 실행
npm run dev

#build 후 firaebase 호스팅 실행
npm run build
firebase deploy
```

## 프로젝트 구성도

```bash
YoriJori/
├─ .eslintrc.cjs
├─ .firebase
│  ├─ hosting..cache
│  ├─ hosting.cHVibGlj.cache
│  └─ hosting.ZGlzdA.cache
├─ .firebaserc
├─ .git
│  ├─ COMMIT_EDITMSG
│  ├─ config
│  ├─ description
│  ├─ FETCH_HEAD
│  ├─ HEAD
│  ├─ hooks
│  │  ├─ applypatch-msg.sample
│  │  ├─ commit-msg.sample
│  │  ├─ fsmonitor-watchman.sample
│  │  ├─ post-update.sample
│  │  ├─ pre-applypatch.sample
│  │  ├─ pre-commit.sample
│  │  ├─ pre-merge-commit.sample
│  │  ├─ pre-push.sample
│  │  ├─ pre-rebase.sample
│  │  ├─ pre-receive.sample
│  │  ├─ prepare-commit-msg.sample
│  │  ├─ push-to-checkout.sample
│  │  ├─ sendemail-validate.sample
│  │  └─ update.sample
│  ├─ index
│  ├─ info
│  │  └─ exclude
│  ├─ LICENSE.md
│  ├─ package.json
│  ├─ README.md
│  ├─ sample
│  │  ├─ index.html
│  │  ├─ script.js
│  │  └─ styles.css
│  ├─ src
│  │  └─ ckeditor.ts
│  ├─ tsconfig.json
│  └─ webpack.config.js
├─ firebase.json
├─ index.html
├─ main.jsx
├─ package-lock.json
├─ package.json
├─ public
│  ├─ 404.html
│  ├─ Board.css
│  ├─ Header.css
│  ├─ img
│  │  ├─ bg.png
│  │  ├─ carrot.png
│  │  ├─ google_login.png
│  │  ├─ little_purple.png
│  │  ├─ logout.png
│  │  ├─ MainPage_background.png
│  │  ├─ mypg.png
│  │  ├─ purple.png
│  │  ├─ write.png
│  │  ├─ yori.png
│  │  └─ yorijori_profile.png
│  ├─ index.html
│  ├─ Login.css
│  ├─ MainPage.css
│  ├─ mypage.css
│  ├─ NoticePage.css
│  ├─ PostItem.css
│  ├─ SignIn.css
│  ├─ vite.svg
│  └─ yamae.css
├─ README.md
├─ src
│  ├─ App.css
│  ├─ App.jsx
│  ├─ assets
│  │  └─ react.svg
│  ├─ components
│  │  ├─ All.jsx
│  │  ├─ annaeBoard.jsx
│  │  ├─ board.jsx
│  │  ├─ ckEditor.jsx
│  │  ├─ Comment.jsx
│  │  ├─ firebase-utils.js
│  │  ├─ Header.jsx
│  │  ├─ ImageUploadAdapter.js
│  │  ├─ jayou.jsx
│  │  ├─ jayouBoard.jsx
│  │  ├─ jayouNoticepage.jsx
│  │  ├─ jinsim.jsx
│  │  ├─ jinsimBoard.jsx
│  │  ├─ jinsimNoticePage.jsx
│  │  ├─ Login.jsx
│  │  ├─ MainPage.jsx
│  │  ├─ MainPageBoard.jsx
│  │  ├─ myPage.jsx
│  │  ├─ NoticePage.jsx
│  │  ├─ Pagination.jsx
│  │  ├─ PopularPosts.jsx
│  │  ├─ PostItem.jsx
│  │  ├─ SignIn.jsx
│  │  ├─ SocialKakao.jsx
│  │  ├─ TextEditor.jsx
│  │  ├─ UpLoad.jsx
│  │  ├─ UserContext.jsx
│  │  ├─ Yamae.jsx
│  │  ├─ yamaeBoard.jsx
│  │  └─ yamaeNoticePage.jsx
│  └─ firebase-config.js
└─ vite.config.js
```
