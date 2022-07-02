CREATE TABLE public.comments (
	id serial4 NOT NULL,
	user_name varchar(32) NOT NULL,
    comment text NOT NULL,
    animal_id serial4,
    FOREIGN KEY (animal_id) REFERENCES animals(id),
    CONSTRAINT comments_pkey PRIMARY KEY (id)
);

