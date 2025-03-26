import express from 'express';
import { ContribMatchFacade } from '../controller/ContribMatchFacade.ts';
import { Proficiency } from '../model/Skill.ts';
import type { Skill } from '../model/Skill.ts';

const app = express();
app.use(express.json());

const facade = new ContribMatchFacade();

function isValidSkills(obj: unknown): obj is Array<Skill> {
  return (
    obj instanceof Array &&
    obj.every(
      (el) =>
        el instanceof Object &&
        'name' in el &&
        typeof el.name === 'string' &&
        'proficiency' in el &&
        el in Proficiency
    )
  );
}

app.post('/createContributor', (req, res) => {
  if (
    req.body.name &&
    typeof req.body.name === 'string' &&
    req.body.skills &&
    isValidSkills(req.body.skills)
  ) {
    facade.createContributor(req.body.name, req.body.skills);
  } else {
    res.status(400);
    res.send('Bad request');
  }
});

app.post('/createProject', (req, res) => {
  if (
    req.body.name &&
    typeof req.body.name === 'string' &&
    req.body.skills &&
    isValidSkills(req.body.skills)
  ) {
    facade.createProject(req.body.name, req.body.skills);
  } else {
    res.status(400);
    res.send('Bad request');
  }
});

app.post('/editContributor/:id', (req, res) => {
  if (
    req.body.id &&
    typeof req.body.id === 'number' &&
    req.body.skills &&
    isValidSkills(req.body.skills)
  ) {
    facade.editContributor(req.body.id, req.body.skills);
  } else {
    res.status(400);
    res.send('Bad request');
  }
});

app.post('/editProject/:id', (req, res) => {
  if (
    req.body.id &&
    typeof req.body.id === 'number' &&
    req.body.skills &&
    isValidSkills(req.body.skills)
  ) {
    facade.editProject(req.body.id, req.body.skills);
  } else {
    res.status(400);
    res.send('Bad request');
  }
});

app.post('updateMatches', (req, res) => {
  facade.updateMatches();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
