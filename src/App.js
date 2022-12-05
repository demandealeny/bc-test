import React from 'react';
import './style.css';

const messages = {
  skillOne: "Approche et Accroche d'une talent tech",
  skillTwo: 'Briefer debriefer et closer un process',
  skillThree: 'Maitriser les metiers et le jargon tech',
  skillFour: 'Prendre un brief et qualifier un job tech',
  skillFive: 'Qualifier un profil technique',
  skillSix: 'Structurer un process de recrutement',
  skillSeven: 'Superviser un onboarding',
};

function extractSkill(skill, skillKey, scoreMax) {
  const [key, value] = skill.split('=');

  if (!key || !value) {
    return {};
  }

  return {
    message: messages[key],
    score: value,
    scoreMax: scoreMax[skillKey],
  };
}

function roundNearest5(num) {
  return Math.round(num / 5) * 5;
}

function percentageCompletion(score, max) {
  return Math.ceil((score / max) * 100);
}

function Score(skill) {
  const completion = percentageCompletion(skill.score, skill.scoreMax);
  const completionVisual = roundNearest5(completion) + "";

  return (
    <li className="skill">
      <div className="skill__text">
        <p>{skill.message}</p>
        <p className="skill__answers">
          Correct: {skill.score}/{skill.scoreMax} questions
        </p>
      </div>
      <p className="skill__percentage" data-completion={completionVisual}>
        <b>{completion + "%"}</b>
      </p>
    </li>
  );
}

export default function App() {
  const paramsString = location.search.replace('?', '').split('&');

  const scoresMax = paramsString
    .filter((skill) => skill.match(/Max=/))
    .map((skill) => skill.split('=')[1]);

  const scores = paramsString
    .filter((skill) => !skill.match(/Max=/))
    .map((skill, key) => extractSkill(skill, key, scoresMax));

  const totalScore = scores.reduce((total, skill) => skill.score + total, 0);
  const totalScoreMax = scoresMax.reduce((total, score) => score + total, 0);
  const successRate = percentageCompletion(totalScore, totalScoreMax) + "%";

  return (
    <>
      <header>
        <p>
          Vous avez terminé le questionnaire avec un taux de succés de
          <b> {successRate}</b>
        </p>
      </header>
      <main>
        <p className="title">SCORE PAR DOMAINE</p>
        <hr />
        <ul>{scores.map(Score)}</ul>
      </main>
    </>
  );
}
