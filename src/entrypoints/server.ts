import express from 'express';
import { inspect } from 'util';
import { ContribMatchFacade } from '../controller/ContribMatchFacade.ts';
import { Proficiency } from '../model/Skill.ts';
import type { Skill } from '../model/Skill.ts';
import { NotFoundError } from '../error/NotFoundError.ts';

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

app.post('/contributors', (req, res) => {
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

app.post('/projects', (req, res) => {
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

app.get('/contributors/:id', (req, res) => {
  if (!Number.isNaN(Number(req.params.id))) {
    try {
      const contributor = facade.getContributor(Number(req.params.id));
      res.status(201).send(JSON.stringify({ contributor }));
    } catch (err) {
      if (err instanceof NotFoundError) {
        res.status(404).send(`ID ${req.params.id} not found`);
      } else {
        res.status(500).send(`Internal Server Error`);
      }
    }
  } else {
    res.status(400).send('Bad request');
  }
});

app.get('/projects/:id', (req, res) => {
  if (!Number.isNaN(Number(req.params.id))) {
    try {
      const project = facade.getProject(Number(req.params.id));
      res.status(201).send(JSON.stringify({ project }));
    } catch (err) {
      if (err instanceof NotFoundError) {
        res.status(404).send(`ID ${req.params.id} not found`);
      } else {
        res.status(500).send(`Internal Server Error`);
      }
    }
  } else {
    res.status(400).send('Bad request');
  }
});

app.put('/contributors/:id', (req, res) => {
  if (
    !Number.isNaN(Number(req.params.id)) &&
    req.body.skills &&
    isValidSkills(req.body.skills)
  ) {
    try {
      facade.editContributor(Number(req.params.id), req.body.skills);
      res.status(200).send('Contributor edited successfully');
    } catch (err) {
      if (err instanceof NotFoundError) {
        res.status(404).send(`ID ${req.params.id} not found`);
      } else {
        res.status(500).send(`Internal Server Error`);
      }
    }
  } else {
    res.status(400).send('Bad request');
  }
});

app.delete('/contributors/:id', (req, res) => {
  if (!Number.isNaN(Number(req.params.id))) {
    try {
      facade.deleteContributor(Number(req.params.id));
      res.status(200).send('Contributor deleted successfully');
    } catch (err) {
      if (err instanceof NotFoundError) {
        res.status(404).send(`ID ${req.params.id} not found`);
      } else {
        res.status(500).send(`Internal Server Error`);
      }
    }
  } else {
    res.status(400).send('Bad request');
  }
});

app.put('/projects/:id', (req, res) => {
  if (
    !Number.isNaN(Number(req.params.id)) &&
    req.body.skills &&
    isValidSkills(req.body.skills)
  ) {
    try {
      facade.editProject(Number(req.params.id), req.body.skills);
      res.status(200).send('Project edited successfully');
    } catch (err) {
      if (err instanceof NotFoundError) {
        res.status(404).send(`ID ${req.params.id} not found`);
      } else {
        res.status(500).send(`Internal Server Error`);
      }
    }
  } else {
    res.status(400).send('Bad request');
  }
});

app.put('/update-matches', (req, res) => {
  facade.updateMatches();
  res.status(200).send('Updated matches successfully');
});

app.get('/print-state', (req, res) => {
  console.log(inspect(facade, true, 5));
  res.status(200).send('OK');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
