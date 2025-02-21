USE pymagic;

CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    avatar_id INT,
    name VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    last_login_at TIMESTAMP,
    earned_points INT,
    game_level INT,
    parent_email VARCHAR(255),
    age INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE motivations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    text VARCHAR(255),
    score_level VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE rewards (
    id INT PRIMARY KEY AUTO_INCREMENT,
    type VARCHAR(255),
    image VARCHAR(255),
    required_points INT
);

CREATE TABLE achievements (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    reward_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (reward_id) REFERENCES rewards(id)
);

CREATE TABLE chatbot (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    prompt VARCHAR(255),
    answer VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE sections (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255),
    description VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE units (
    id VARCHAR(255) PRIMARY KEY,
    section_id INT,
    name VARCHAR(255),
    description VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (section_id) REFERENCES sections(id)
);

CREATE TABLE lessons (
    id VARCHAR(255) PRIMARY KEY,
    unit_id VARCHAR(255),
    title VARCHAR(255),
    description VARCHAR(255),
    flash_card VARCHAR(255),
    video_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (unit_id) REFERENCES units(id)
);

CREATE TABLE questions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    lesson_id VARCHAR(255),
    question VARCHAR(255),
    type ENUM('multiple_choice', 'true_false'),
    options JSON,
    correct_answer VARCHAR(255),
    hint VARCHAR(255),
    level ENUM('easy', 'medium', 'hard'),
    points INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (lesson_id) REFERENCES lessons(id)
);

CREATE TABLE student_quizzes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    lesson_id VARCHAR(255),
    unit_id VARCHAR(255),
    user_id INT,
    is_passed BOOLEAN,
    score INT,
    earned_points INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (lesson_id) REFERENCES lessons(id),
    FOREIGN KEY (unit_id) REFERENCES units(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE student_quiz_questions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    question_id INT,
    quiz_id INT,
    answer VARCHAR(255),
    is_correct BOOLEAN,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (question_id) REFERENCES questions(id),
    FOREIGN KEY (quiz_id) REFERENCES student_quizzes(id)
);
