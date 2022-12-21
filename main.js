let questionList = [
  {
    question:
      "Characterized by skill at understanding and profiting by circumstances",
    options: ["Prescient", "Analyst", "Diminution", "Shrewd"],
    answer: "",
  },
  {
    question:
      "Characterized by skill at understanding and profiting by circumstances",
    options: ["Prescient", "Analyst", "Diminution", "Shrewd"],
    answer: "",
  },
  {
    question:
      "Characterized by skill at understanding and profiting by circumstances",
    options: ["123", "235", "567", "789"],
    answer: "",
  },
  {
    question:
      "Characterized by skill at understanding and profiting by circumstances",
    options: ["123", "235", "567", "789"],
    answer: "",
  },
  {
    question:
      "Characterized by skill at understanding and profiting by circumstances",
    options: ["123", "235", "567", "789"],
    answer: "",
  },
];
const total = questionList.length;
let currentQuest = 0;
let range = (1 / questionList.length) * 100;
$(".prog").css("--percent", `${range}%`);

const append = (currentQuest) => {
  const elem = questionList[currentQuest];
  if (elem) {
    $(".quizzWrap .prog .number .total").text(total);
    $(".quizzWrap .prog .number .current").text(currentQuest + 1);
    $(" .quizzBox .questionWrap").html(
      `<div class="question ">
        <h3>${elem.question}</h3>
        <ul class="listanswer d-flex flex-column mt-4">
          ${elem.options
            .map((option, answerNumber) => {
              console.log(elem.answer, answerNumber);
              return `<li>
            <label for="${answerNumber}" class="answer d-flex align-items-center">
              <span class="answerContent">${option}</span>
              <input ${
                elem.answer && Number(elem.answer) === answerNumber
                  ? "checked"
                  : ""
              } type="radio" name="radio" value=${answerNumber} id="${answerNumber}" />
              <span class="checkmark"></span>
              <div class="bg"></div>
            </label>
          </li>`;
            })
            .join("")}
        </ul>
      </div>`
    );
    $(".quizzBox .questionWrap .question .answer ").on("click", function () {
      questionList[currentQuest].answer = $(this).find("input").attr("value");
      if (
        questionList.every((elem) => {
          return elem.answer !== "";
        })
      ) {
        $(".controls .submit").addClass("d-block");
      }
    });
  }
};
// init first time
append(currentQuest);

// Button control event
$(".controls .next").click(() => {
  range = range + (1 / questionList.length) * 100;
  $(".prog").css("--percent", `${range}%`);
  $(".controls .previous").removeClass("d-none");
  currentQuest += 1;
  append(currentQuest);
  if (currentQuest === total - 1) {
    $(".controls .next").addClass("d-none");
  }
});

$(".controls .previous").click(() => {
  range = range - (1 / questionList.length) * 100;
  $(".prog").css("--percent", `${range}%`);
  currentQuest -= 1;
  append(currentQuest);
  $(".controls .next.d-none").removeClass("d-none");
  if (currentQuest === 0) {
    $(".controls .previous").addClass("d-none");
  }
});

$(".controls .submit").click(() => {
  $(".quizzWrap").addClass("d-none");
  $(".thankyou").removeClass("d-none");
  $(".thankyou").addClass("d-flex");

  $("#resultModal table tbody").append(`
  ${questionList.map((elem, index) => {
    return `<tr>
    <th class="text-center" scope="row">${index + 1}</th>
    <td>${elem.question}</td>
    <td class="text-center">${elem.options[elem.answer]}</td>
  </tr>`;
  })}
  `);
});
$(".quizzBox .questionWrap .question .answer ").on("click", function () {
  questionList[currentQuest].answer = $(this).find("input").attr("value");
  console.log(questionList);
});
