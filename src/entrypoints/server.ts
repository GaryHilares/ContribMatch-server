import express from 'express';
import { inspect } from 'util';
import { ContribMatchFacade } from '../controller/ContribMatchFacade.ts';
import { Proficiency } from '../model/Skill.ts';
import type { Skill } from '../model/Skill.ts';

const app = express();
app.use(express.json({ type: 'application/json' }));

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
        el.proficiency in Proficiency
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
    const id = facade.createContributor(req.body.name, req.body.skills);
    res.status(201).send(JSON.stringify({ id: id }));
  } else {
    res.status(400).send('Bad request');
  }
});

app.post('/createProject', (req, res) => {
  if (
    req.body.name &&
    typeof req.body.name === 'string' &&
    req.body.skills &&
    isValidSkills(req.body.skills)
  ) {
    const id = facade.createProject(req.body.name, req.body.skills);
    res.status(201).send(JSON.stringify({ id: id }));
  } else {
    res.status(400).send('Bad request');
  }
});

function isNumber(str): boolean {
  return !isNaN(str);
}

app.get('/contributor/:id', (req, res) => {
  if (req.params.id && isNumber(req.params.id)) {
    try {
      const contributor = facade.getContributor(req.params.id);
      res.status(201).send(JSON.stringify({ contributor }));
    } catch (NotFoundError) {
      res.status(404).send(`ID ${req.params.id} not found`);
    }
  } else {
    res.status(400).send('Bad request');
  }
});

app.get('/project/:id', (req, res) => {
  if (req.params.id && isNumber(req.params.id)) {
    try {
      const project = facade.getProject(req.params.id);
      res.status(201).send(JSON.stringify({ project }));
    } catch (NotFoundError) {
      res.status(404).send(`ID ${req.params.id} not found`);
    }
  } else {
    res.status(400).send('Bad request');
  }
});

app.post('/editContributor/:id', (req, res) => {
  if (
    req.body.id &&
    typeof req.body.id === 'number' &&
    req.body.skills &&
    isValidSkills(req.body.skills)
  ) {
    try {
      facade.editContributor(req.body.id, req.body.skills);
      res.status(200).send('Contributor edited successfully');
    } catch {
      res.status(404).send(`ID ${req.body.id} not found`);
    }
  } else {
    res.status(400).send('Bad request');
  }
});

app.delete('/contributor/:id', (req, res) => {
  const id = Number(req.params.id);
  if (!isNaN(id)) {
    try {
      facade.deleteContributor(id);
      res.status(200).send('Contributor deleted successfully');
    } catch {
      res.status(404).send(`ID ${id} not found`);
    }
  } else {
    res.status(400).send('Bad request');
  }
});

app.post('/editProject/:id', (req, res) => {
  if (
    req.body.id &&
    typeof req.body.id === 'number' &&
    req.body.skills &&
    isValidSkills(req.body.skills)
  ) {
    try {
      facade.editProject(req.body.id, req.body.skills);
      res.status(200).send('Project edited successfully');
    } catch {
      res.status(404).send(`ID ${req.body.id} not found`);
    }
  } else {
    res.status(400).send('Bad request');
  }
});

app.post('/updateMatches', (req, res) => {
  facade.updateMatches();
  res.status(200).send('Updated matches successfully');
});

app.get('/printState', (req, res) => {
  console.log(inspect(facade, true, 5));
  res.status(200).send('OK');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
