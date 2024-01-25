# 요리조리 / 레시피 공유 커뮤니티
1인가구 비율 2022년 기준 34.5%로 약 20%가 증가, 추가적인 경제적인 문제로 인한 물가 상승 및 배달비 증가로 인해 스스로 혼자 요리를 하고싶어 하는 사람들을 위한 커뮤니티

### 프로젝트 세부내용 
[블로그 바로가기] //(작성중)//

## 개발 Stack ##
- React (v18.2.0)
- vite (v5.0.11)

## 실행 전 준비사항
※ 모든 버전은 프로젝트 개시 당시 버전
1. Node.js 설치
-버전: v21.1.0

2.npm 설치
-버전: v10.2.0

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

#프로젝트 실행
npm run dev
```

## 프로젝트 구성도
```bash
YoriJori/
|-- ckeditor5/
|-- node_modules/
|-- public/
|   |-- css/
|       |-- style.css
|   |-- img/
|       |-- image1.png(예시)
|       |-- image2.jpg(예시)
|-- src/
|   |-- components/
|       |-- Component1.jsx(예시)
|       |-- Component2.jsx(예시)
|   |-- App.jsx
|   |-- App.css
|   |-- firebase-config.js
|   |-- main.jsx
|-- .eslintrc.js
|-- .gitignore
|-- index.html
|-- package-lock.json
|-- package.json
|-- README.md
|-- vite.config.js
```
