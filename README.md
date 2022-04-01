<p align="middle">
  <img src="https://user-images.githubusercontent.com/81365896/161226796-03c4ef5d-6b98-4fa8-a156-c8998148bbd9.png" style="width: 480px;">
</p>
<h1 align="middle">Subway Linemap</h1>
<p align="middle">지하철 노선도를 그리고, 최단 경로를 보여주는 SPA</p>

- [소개](#%EF%B8%8F-소개)
- [특징](#%EF%B8%8F-특징)
- [스크린샷](#%EF%B8%8F-스크린샷)
- [위키문서](https://github.com/sanoopark/spa-subway-map/wiki/%EC%A0%84%EC%97%AD-%EC%83%81%ED%83%9C-%EA%B4%80%EB%A6%AC)
- [요구사항](https://github.com/woowacourse/javascript-subway#-step1)
- [실행방법](#%EF%B8%8F-실행방법)

## ⭐️ 소개

- 사용자의 입력에 따라 지하철 노선도를 그리고, Open API를 통해 최단 경로를 보여주는 SPA입니다.
- 해당 프로젝트는 [우아한 테크코스 미션](https://github.com/woowacourse/javascript-subway) 중 하나입니다. 요구사항이 세밀해 Vanilla JS 학습 목적으로 활용했습니다.

## ⭐️ 특징

- 리액트의 라이프 사이클을 모방해 [클래스형 컴포넌트](https://github.com/sanoopark/spa-subway-map/blob/main/src/js/core/Component.mjs) 구현 [[설명]](https://github.com/sanoopark/spa-subway-map/wiki/%ED%81%B4%EB%9E%98%EC%8A%A4%ED%98%95-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8)
- [옵저버 패턴](https://github.com/sanoopark/spa-subway-map/blob/main/src/js/core/observer.js)으로 [전역 스토어](https://github.com/sanoopark/spa-subway-map/blob/main/src/js/core/store.js)를 구현해 로그인 상태 관리 [[설명]](https://github.com/sanoopark/spa-subway-map/wiki/%EC%A0%84%EC%97%AD-%EC%83%81%ED%83%9C-%EA%B4%80%EB%A6%AC)
- 간결한 라우팅을 위해 [직접 제작한 라이브러리](https://github.com/sanoopark/simple-vanilla-router) 사용
- 반복되는 컴포넌트 재사용 [[설명]](https://github.com/sanoopark/spa-subway-map/wiki/%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8-%EC%9E%AC%EC%82%AC%EC%9A%A9)

## ⭐️ 스크린샷

<table>
<thead>
  <tr>
    <th>역 관리</th>
    <th>노선 관리</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td><img src="https://user-images.githubusercontent.com/81365896/161235342-f1e5ab10-dc3d-4915-82ef-71072602c393.png"></td>
    <td><img src="https://user-images.githubusercontent.com/81365896/161235477-f3997020-e18a-422c-bb93-a00fd245672d.gif"></td>
  </tr>
</tbody>
<thead>
  <tr>
    <th>전체 보기</th>
    <th>길찾기</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td><img src="https://user-images.githubusercontent.com/81365896/161235750-5c95fdf0-ba5c-4c36-b053-ccb704b2abaa.png"></td>
    <td><img src="https://user-images.githubusercontent.com/81365896/161235870-c0272798-1e95-4477-a592-4f9f902cdc85.gif"></td>
  </tr>
</tbody>
</table>

## ⭐️ [위키문서](https://github.com/sanoopark/spa-subway-map/wiki/%EC%A0%84%EC%97%AD-%EC%83%81%ED%83%9C-%EA%B4%80%EB%A6%AC)

## ⭐️ [요구사항](https://github.com/woowacourse/javascript-subway#-step1)

## ⭐️ 실행방법

```
npm install
npm start
```
