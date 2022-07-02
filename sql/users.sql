CREATE TABLE public.users (
	id serial4 NOT NULL,
	first_name varchar(32) NULL,
	last_name varchar(32) NULL,
	user_name varchar(16) NOT NULL,
	date_registered timestamp NOT NULL DEFAULT now(),
	password varchar(32) NULL,
	email varchar(64) NOT NULL,
	is_admin boolean DEFAULT FALSE,
	CONSTRAINT users_email_key UNIQUE (email),
	CONSTRAINT users_pkey PRIMARY KEY (id),
	CONSTRAINT users_username_key UNIQUE (user_name)
);
