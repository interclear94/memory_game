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

  // 짝이 맞으면 동작
  this.doPairedCard = function () {
    this.pairingState = true;
    return this.pairingState;
  };

  this.rewind = function () {
    this.flippedState = false;
    return this.flippedState;
  };
}

// 카드 리스트 넣는 ul
const cardUl = document.querySelector(".card_area");

function imitateRender() {
  // li 태그 생성
  for (let i = 0; i < 24; i++) {
    // 포켓몬 오리지널 이미지 생성
    const li = document.createElement("li");
    const cardInner = document.createElement("div");
    const cardBack = document.createElement("div"); // 카드 뒷면

    const cardBackImg = document.createElement("img");
    cardBackImg.src = "./img/poketmonback.png";

    // cardImg
    li.classList.toggle("active_hover");
    cardBack.classList.add("card_back");
    cardInner.classList.add("card_inner");

    // 포켓몬 카드 DOM 생성
    cardBack.append(cardBackImg);
    cardInner.append(cardBack);

    li.append(cardInner);
    cardUl.append(li);
  }
}

imitateRender();

// 랜덤 포켓몬 그리는 함수
function render() {
  const cardList = []; // 카드의 속성을 담을 빈 배열
  const cardListLength = 24; // 카드의 속성을 담을 빈 배열
  const pickedCardList = [];

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
    li.classList.toggle("active_hover");
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
    // const cardObjflipped = pickedCardList[i].flippedState; // 카드 뒤집은 상태
    // const cardObjPairing = pickedCardList[i].pairingState; // 카드 매칭 상태

    const li = cardUl.querySelector(`li:nth-child(${cardObjPosition + 1})`);

    const frontImg = cardUl.querySelector(
      `li:nth-child(${cardObjPosition + 1}) img`
    );

    frontImg.src = `./img/poketmon${cardObjNumber}.png`;
    frontImg.alt = "랜덤포켓 이미지";

    // dataset
    li.dataset.cardNumber = cardObjNumber; // 카드드
    li.dataset.poisition = cardObjPosition; // 카드가 있는 li 위치
    // li.dataset.flipped = cardObjflipped; // 카드를 뒤집은 상태
    // li.dataset.pairing = ㅕcardObjPairing; // 짝맞춘 상태
  }

  // Card를 담은 li NodeList
  const randomLi = document.querySelectorAll(".card_area > li");
  return { pickedCardList, randomLi };
}

// 게임 초기화
function init(start) {
  return start();
}

let selectedState = false;

// oneCardNumber (처음 고른 카드), theOtherCardNumber (짝맞출 카드)
let oneCardNumber = null;
let theOtherCardNumber = null;

const startModal = document.querySelector(".start-modal-bg");
const resetPop = document.querySelector("header > button");

resetPop.addEventListener("click", function () {
  startModal.style.display = "block";
  const cardBackLi = document.querySelectorAll(".card_back");
  for (let i = 0; i < randomLi.length; i++) {
    const cardBack = Array.from(cardBackLi);
    cardBack[i].style.transform = "rotateY(0deg)";
  }
});

const startBtn = document.getElementById("startBtn");

startBtn.addEventListener("click", function () {
  // 시작할 때 카드 초기화
  cardUl.innerHTML = "";

  let pickedIndex1 = null;
  let pickedIndex2 = null;
  let picked1 = null;
  let picked2 = null;

  const { randomLi, pickedCardList } = init(render);

  randomLi.forEach((list, index) => {
    list.addEventListener("click", function (e) {
      // 카드 선택중인 상태
      e.target.classList.toggle("active_hover");

      // 카드를 고르는 함수
      function oneCheck(pickedIndex) {
        // 카드 선택중인 상태 true 시 다음 코드 고르기
        selectedState = !selectedState;
        if (selectedState) {
          oneCardNumber = list.dataset.cardNumber;
          picked1 = list;
          pickedIndex1 = pickedIndex;

          pickedCardList[pickedIndex1].doFlipCard();

          // 한번 고른 카드 클릭 이벤트 막음
          list.style.cursor = "default"; // 고른 카드 커서 기본 모양
          list.style["pointer-events"] = "none"; // 카드 고른 후 클릭 이벤트 막음

          return { pairingState: null };
        } else {
          // 다른 카드
          theOtherCardNumber = list.dataset.cardNumber;
          picked2 = list;
          pickedIndex2 = pickedIndex;

          // 카드가 짝 맞은 조건
          if (oneCardNumber === theOtherCardNumber) {
            pickedCardList[pickedIndex2].doFlipCard();
            pickedCardList[pickedIndex1].doPairedCard();
            pickedCardList[pickedIndex2].doPairedCard();

            // 짝이 맞을 시 커서 비활성화
            picked1.style.cursor = "default";
            picked1.style["pointer-events"] = "none";

            picked2.style.cursor = "default";
            picked2.style["pointer-events"] = "none";

            const allPass = pickedCardList.every((card) => card.pairingState);
            if (allPass) {
              const clearBg = document.querySelector(".clear-modal-bg");
              clearBg.style.display = "flex";
              return;
            }
            return { pairingState: true }; // 짝 맞춘 true
          } else if (oneCardNumber !== theOtherCardNumber) {
            // 짝이 안 맞을 시
            const cardBack = document.querySelectorAll(".card_back");

            setTimeout(() => {
              cardBack[pickedIndex1].style.transform = "rotateY(0deg)";
              cardBack[pickedIndex2].style.transform = "rotateY(0deg)";
            }, 500);

            // 짝 못맞추면 마우스 커서 활성화
            picked1.classList.toggle("active_hover");
            picked2.classList.toggle("active_hover");

            picked1.style.cursor = "pointer";
            picked1.style["pointer-events"] = "auto";

            picked2.style.cursor = "pointer";
            picked2.style["pointer-events"] = "auto";

            return { pairingState: false }; // 짝 못맞추면 false
          }
        }
      }

      const heartArea = document.querySelector(".heart-area > ol");
      const heartLi = heartArea.querySelectorAll("li");
      const heart = document.querySelector(".heart-area > ol > li:last-child");

      const { pairingState } = selectedState
        ? oneCheck(index)
        : oneCheck(index);
      if (pairingState === null) return;
      if (pairingState) {
        return;
      } else {
        // 카드 실패시 몬스터볼 줄음
        heart.remove();
        if (heartLi.length <= 1) {
          const resetModal = document.querySelector(".end-modal-bg");
          resetModal.style.display = "flex";
          return;
        }
      }
    });
  });

  // 고른 카드 커서 기본 모양
  randomLi.forEach((list) => {
    list.style.cursor = "default"; // 고른 카드 커서 기본 모양
    list.style["pointer-events"] = "none"; // 카드 고른 후 클릭 이벤트 막음
  });

  startModal.style.display = "none";

  const cardBack = document.querySelectorAll(".card_back");

  let count = 20;
  const countFn = setInterval(() => {
    cardBack.forEach((list) => {
      list.style.transform = "rotateY(180deg)";
    });
    const countSpan = document.querySelector(".count");
    countSpan.innerHTML = `${count} 초`;
    count--;

    if (count === 0) {
      countSpan.innerHTML = `${count} 초`;
      countSpan.innerHTML = `시작`;

      randomLi.forEach((list) => {
        list.style.cursor = "pointer";
        list.style["pointer-events"] = "auto";
      });

      cardBack.forEach((list) => {
        list.style.transform = "rotateY(0deg)";
      });

      return clearInterval(countFn);
    }
  }, 1000);

  cardBack.forEach((list) =>
    list.addEventListener("click", function () {
      list.style.transform = "rotateY(180deg)";
    })
  );
});

const resetBtn = document.querySelectorAll(".resetBtn");

resetBtn.forEach((list) => {
  list.addEventListener("click", function () {
    const resetModal = document.querySelector(".end-modal-bg");
    const clearModal = document.querySelector(".clear-modal-bg");
    resetModal.style.display = "none";
    clearModal.style.display = "none";

    const heartArea = document.querySelector(".heart-area > ol");
    for (let i = 0; i < 5; i++) {
      const li = document.createElement("li");
      const img = document.createElement("img");
      img.src = "./img/ball.png";
      li.append(img);
      heartArea.append(li);
    }

    // 시작할 때 카드 초기화
    cardUl.innerHTML = "";

    let pickedIndex1 = null;
    let pickedIndex2 = null;
    let picked1 = null;
    let picked2 = null;

    const { randomLi } = init(render);
    randomLi.forEach((list, index) => {
      list.addEventListener("click", function (e) {
        // 카드 선택중인 상태
        e.target.classList.toggle("active_hover");

        // 카드를 고르는 함수
        function oneCheck(pickedIndex) {
          pickedIndex1 = pickedIndex;
          // 카드 선택중인 상태 true 시 다음 코드 고르기
          selectedState = !selectedState;
          if (selectedState) {
            oneCardNumber = list.dataset.cardNumber;
            picked1 = list;

            // 한번 고른 카드 클릭 이벤트 막음
            list.style.cursor = "default"; // 고른 카드 커서 기본 모양
            list.style["pointer-events"] = "none"; // 카드 고른 후 클릭 이벤트 막음

            return { pairingState: null };
          } else {
            // 다른 카드
            theOtherCardNumber = list.dataset.cardNumber;
            picked2 = list;
            pickedIndex2 = pickedIndex;

            // 카드가 짝 맞은 조건
            if (oneCardNumber === theOtherCardNumber) {
              // 짝이 맞을 시 커서 비활성화
              picked1.style.cursor = "default";
              picked1.style["pointer-events"] = "none";

              picked2.style.cursor = "default";
              picked2.style["pointer-events"] = "none";
              return { pairingState: true }; // 짝 맞춘 true
            } else if (oneCardNumber !== theOtherCardNumber) {
              // 짝이 안 맞을 시
              const cardBack = document.querySelectorAll(".card_back");

              setTimeout(() => {
                cardBack[pickedIndex1].style.transform = "rotateY(0deg)";
                cardBack[pickedIndex2].style.transform = "rotateY(0deg)";
              }, 500);

              // 짝 못맞추면 마우스 커서 활성화
              picked1.classList.toggle("active_hover");
              picked2.classList.toggle("active_hover");

              picked1.style.cursor = "pointer";
              picked1.style["pointer-events"] = "auto";

              picked2.style.cursor = "pointer";
              picked2.style["pointer-events"] = "auto";

              const allPass = pickedCardList.every((card) => card.pairingState);
              if (allPass) {
                const clearBg = document.querySelector(".clear-modal-bg");
                clearBg.style.display = "flex";
                return;
              }
              return { pairingState: false }; // 짝 못맞추면 false
            }
          }
        }

        const heartArea = document.querySelector(".heart-area > ol");
        const heartLi = heartArea.querySelectorAll("li");
        const heart = document.querySelector(
          ".heart-area > ol > li:last-child"
        );

        const { pairingState } = selectedState
          ? oneCheck(index)
          : oneCheck(index);
        if (pairingState === null) return;
        if (pairingState) {
          return;
        } else {
          // 카드 실패시 몬스터볼 줄음
          heart.remove();
          if (heartLi.length <= 1) {
            const resetModal = document.querySelector(".end-modal-bg");
            resetModal.style.display = "flex";
            return;
          }
        }
      });
    });

    // 고른 카드 커서 기본 모양
    randomLi.forEach((list) => {
      list.style.cursor = "default"; // 고른 카드 커서 기본 모양
      list.style["pointer-events"] = "none"; // 카드 고른 후 클릭 이벤트 막음
    });

    startModal.style.display = "none";

    const cardBack = document.querySelectorAll(".card_back");
    let count = 20;
    const countFn = setInterval(() => {
      cardBack.forEach((list) => {
        list.style.transform = "rotateY(180deg)";
      });
      const countSpan = document.querySelector(".count");
      countSpan.innerHTML = `${count} 초`;
      count--;

      if (count === 0) {
        countSpan.innerHTML = `${count} 초`;
        countSpan.innerHTML = `시작`;

        randomLi.forEach((list) => {
          list.style.cursor = "pointer";
          list.style["pointer-events"] = "auto";
        });

        cardBack.forEach((list) => {
          list.style.transform = "rotateY(0deg)";
        });
        return clearInterval(countFn);
      }
    }, 1000);

    cardBack.forEach((list) =>
      list.addEventListener("click", function () {
        list.style.transform = "rotateY(180deg)";
      })
    );
  });
});
