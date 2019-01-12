CREATE TABLE mvw_user (
  id         int(11)  NOT NULL AUTO_INCREMENT,
  username   TEXT     NOT NULL,
  password   TEXT     NOT NULL,
  created_at datetime NOT NULL,
  updated_at datetime NOT NULL,
  PRIMARY KEY (id)
);
