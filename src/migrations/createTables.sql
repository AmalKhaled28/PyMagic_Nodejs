USE pymagic;

CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    avatar_id INT,
    name VARCHAR(255)  NOT NULL,
    email VARCHAR(255) UNIQUE  NOT NULL,
    password VARCHAR(255) NOT NULL,
    last_login_at TIMESTAMP,
    earned_points INT,
    game_level INT,
    parent_email VARCHAR(255) UNIQUE,
    age INT NOT NULL,  
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE motivations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    text TEXT,
    score_level VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE answer_motivation (
    id INT PRIMARY KEY AUTO_INCREMENT,
    text TEXT,
    answer_type ENUM('correct', 'wrong'),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE rewards (
    id INT PRIMARY KEY AUTO_INCREMENT,
    text VARCHAR(255),
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
    prompt TEXT,
    answer TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE sections (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE units (
    id VARCHAR(255) PRIMARY KEY,
    section_id INT,
    name VARCHAR(255),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (section_id) REFERENCES sections(id)
);

CREATE TABLE lessons (
    id VARCHAR(255) PRIMARY KEY,
    unit_id VARCHAR(255),
    title VARCHAR(255),
    description TEXT,
    flash_card TEXT,
    video_url TEXT,
    language VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (unit_id) REFERENCES units(id)
);

CREATE TABLE questions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    lesson_id VARCHAR(255),
    question TEXT,
    type ENUM('multiple_choice', 'true_false'),
    options JSON,
    correct_answer TEXT,
    hint TEXT,
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
    answer TEXT,
    is_correct BOOLEAN,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (question_id) REFERENCES questions(id),
    FOREIGN KEY (quiz_id) REFERENCES student_quizzes(id)
);


-- Get-Content D:\PymagicBackend\src\migrations\createTables1.sql | mysql -u root -p pymagic