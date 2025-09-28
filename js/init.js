// 시간 설정
// 게임 초기 설정
const totalCardBox = []; // 전체 카드
const randomCardBox = []; // 랜덤으로 생성된 카드

// 랜덤 카드 생성자 함수
// 카드 하나
// oneCard : 처음 카드 / theOtherCard : 같은 다른 카드 위치
function CreateCard(cardNumber, position) {
  this.cardNumber = cardNumber; // 카드 뒤집힌 상태;
  this.position = position; // 카드 위치 인덱스

  this.flippedState = false; // 카드 뒤집힌 상태
  this.pairingState = false; // 짝 맞춘 여부;

  // 카드 뒤집는 기능
  this.doFlipCard = function () {
    this.flippedState = true;
    return this.flippedState;
  };

  this.rewind = function () {
    this.flippedState = false;
    return this.flippedState;
  };
}

// 카드 리스트 넣는 ul
const cardUl = document.querySelector(".card_area");

// 랜덤 포켓몬 그리는 함수
function render() {
  const cardList = []; // 카드의 속성을 담을 빈 배열
  const cardListLength = 24; // 카드의 속성을 담을 빈 배열
  const pickedCardList = [];

  // 시작할 때 카드 초기화
  cardUl.innerHTML = "";

  // 모든 카드 리스트 totalCardBox에 넣기
  for (let i = 1; i <= 26; i++) {
    totalCardBox.push(i);
  }

  for (let i = 0; i < cardListLength; i++) {
    cardList.push(i);
  }
  // 카드 뒷면 이미지 url
  const cardBackImgSrc = "./img/poketmonback.png";

  // 중복되지 않게 12개 이미지 생성
  for (let i = 0; i < 12; i++) {
    // // 중복되지 않는 랜덤 숫자
    const randomCard = Math.floor(Math.random() * totalCardBox.length);

    // 랜덤 숫자 1개 카드
    const randomPicked = totalCardBox.splice(randomCard, 1);

    // card 인덱스 1~24
    const randomPosition = Math.floor(Math.random() * cardList.length);
    const oneRandom = cardList.splice(randomPosition, 1);

    const theOtherRandomPosition = Math.floor(Math.random() * cardList.length);
    const theOtherRandom = cardList.splice(theOtherRandomPosition, 1);

    // cardList 생성자 함수 넣기
    // 카드 한 쌍 객체 생성
    const cardObj1 = new CreateCard(randomPicked[0], oneRandom[0]);
    const cardObj2 = new CreateCard(randomPicked[0], theOtherRandom[0]);

    pickedCardList.push(cardObj1, cardObj2);
  }

  // li 태그 생성
  for (let i = 0; i < cardListLength; i++) {
    // 포켓몬 오리지널 이미지 생성
    const li = document.createElement("li");
    const cardInner = document.createElement("div");
    const cardFront = document.createElement("div"); // 포켓몬이 보여지는 카드 카드 앞면
    const cardBack = document.createElement("div"); // 카드 뒷면

    // 카드 앞면
    const randomPoketmon = document.createElement("img");

    // 카드 뒷면
    const cardBackImg = document.createElement("img");
    cardBackImg.src = cardBackImgSrc;
    cardBackImg.alt = "카드 앞면";

    // cardImg
    cardFront.classList.add("card_front");
    cardBack.classList.add("card_back");
    cardInner.classList.add("card_inner");

    // 포켓몬 카드 DOM 생성
    cardFront.append(randomPoketmon);
    cardBack.append(cardBackImg);
    cardInner.append(cardFront, cardBack);

    li.append(cardInner);
    cardUl.append(li);
  }

  for (let i = 0; i < pickedCardList.length; i++) {
    const cardObjNumber = pickedCardList[i].cardNumber; // 카드 이름
    const cardObjPosition = pickedCardList[i].position; // 카드가 있는 li 위치
    const cardObjflipped = pickedCardList[i].flippedState; // 카드 뒤집은 상태
    const cardObjPairing = pickedCardList[i].pairingState; // 카드 매칭 상태

    const li = cardUl.querySelector(`li:nth-child(${cardObjPosition + 1})`);

    const frontImg = cardUl.querySelector(
      `li:nth-child(${cardObjPosition + 1}) img`
    );

    frontImg.src = `./img/poketmon${cardObjNumber}.png`;
    frontImg.alt = "랜덤포켓 이미지";

    // dataset
    li.dataset.cardNumber = cardObjNumber; // 카드드
    li.dataset.poisition = cardObjPosition; // 카드가 있는 li 위치
    li.dataset.flipped = cardObjflipped; // 카드를 뒤집은 상태
    li.dataset.pairing = cardObjPairing; // 짝맞춘 상태
  }

  // Card를 담은 li NodeList
  const randomLi = document.querySelectorAll(".card_area > li");
  return { pickedCardList, randomLi };
}

// 게임 초기화
function init() {
  // render 실행 후 카드 생성자 및 Node 반환
  const { pickedCardList, randomLi } = render();
  // render();
  return { pickedCardList, randomLi };
}

const { pickedCardList, randomLi } = init();

const startBtn = document.getElementById("startBtn");
const startBg = document.querySelector(".start-modal-bg");

let selectedState = false;

// 클릭 이벤트
// e.target.style.cursor = "default";
randomLi.forEach((list) => {
  list.addEventListener("click", function (e) {
    const index = Array.from(randomLi).indexOf(list);
    const { pickedCardList } = !selectedState
      ? oneCheck(index)
      : theOtherCheck(index);
    console.log(index);
  });
});

function oneCheck(idx) {
  // 카드 하나 고른 상태; let selectedCard = false;
  // console.log(pickedCardList[idx].doFlipCard());
  return { pickedCardList };
}

function theOtherCheck(idx) {
  // 카드 하나 고른 상태; let selectedCard = false;
  // console.log(pickedCardList[idx].doFlipCard());
  return { pickedCardList };
}

// startBtn.addEventListener("click", function () {
//   startBg.style.display = "none";
//   // 전체 랜덤 카드 생성자 배열 반환

//   const allLi = document.querySelectorAll(".card_back");
//   // list.style.transform = "rotateY(0deg)";
//   // 카드 보여주는 시간 20초
//   // setTimeout(() => {
//   //   allLi.forEach((list) => {
//   //     list.addEventListener("click", function () {
//   //       list.style.transform = "rotateY(0deg)";
//   //     });
//   //   });
//   // }, 20000);
//   // console.log(allLi);
//   allLi.forEach((list) => {
//     console.log(list);
//     list.addEventListener("click", function () {
//       console.log("ddd");
//       // list.style.transform = "rotateY(180deg)";
//     });
//   });
// });
