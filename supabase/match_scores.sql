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
LEFT JOIN user_skills us
    ON us.name = ps.name

JOIN users u ON u.id = us.associated_user
GROUP BY u.id, p.id;