CREATE TABLE users (
    id bigint unique GENERATED ALWAYS AS IDENTITY,
    name text not null,
    email text not null
);

CREATE TABLE user_skills (
    associated_user bigint not null references users(id),
    name text not null,
    proficiency int not null
);

CREATE TABLE tokens (
    user_id bigint references users(id),
    token bigint
);

CREATE TABLE projects (
    id bigint unique GENERATED ALWAYS AS IDENTITY,
    name text not null,
    owner_id bigint not null references users(id)
);

CREATE TABLE project_skills (
    associated_project bigint not null references projects(id),
    name text not null,
    proficiency int not null
);

CREATE TABLE matchings (
    user_id bigint not null references users(id),
    project_id bigint not null references projects(id)
);