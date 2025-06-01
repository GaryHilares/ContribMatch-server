INSERT INTO users (name, email) VALUES
('Alice', 'alice@example.com'),
('Bob', 'bob@example.com');

-- Alice
INSERT INTO user_skills (associated_user, name, proficiency) VALUES
(1, 'Python', 3),
(1, 'SQL', 4);

-- Bob
INSERT INTO user_skills (associated_user, name, proficiency) VALUES
(2, 'Python', 5),
(2, 'Java', 2);

INSERT INTO projects (name, email, owner_id) VALUES
('Project X', 'projx@example.com', 1),
('Project Y', 'projy@example.com', 2);

-- Project X requires Python and SQL
INSERT INTO project_skills (associated_project, name, proficiency) VALUES
(1, 'Python', 4),
(1, 'SQL', 4);

-- Project Y requires Java and Python
INSERT INTO project_skills (associated_project, name, proficiency) VALUES
(2, 'Java', 3),
(2, 'Python', 5);

CREATE TABLE match_scores AS
SELECT
    u.id AS user_id,
    p.id AS project_id,
    SUM(
        9 - POWER(ABS(
            COALESCE(us.proficiency, 0) - ps.proficiency
        ), 2)
    ) AS total_score
FROM projects p
JOIN project_skills ps ON ps.associated_project = p.id
LEFT JOIN user_skills us ON us.name = ps.name
JOIN users u ON u.id = us.associated_user
GROUP BY u.id, p.id;