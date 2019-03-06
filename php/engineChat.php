<?php

	if($_POST["newMsg"])
	{
		$msg = json_decode($_POST['newMsg']);
		$date = date("d.m.Y H:i:s");
		$author = $msg->author;
		$text = $msg->text;

		if(!empty($date) && !empty($author) &&  !empty($text))
		{

			$db = mysqli_connect("localhost", "root", "", "auto");
			if($db->connect_error)
			{
				die($db->connect_error);
			}

			createTableEngineChat($db);

			$query = mysqli_query($db, "INSERT INTO engine_chat (date, author, text) VALUES('$date', '$author', '$text')") or die(mysqli_error($db));
			mysqli_close($db);
			echo "success";
		}
		else {
			echo "error";
		}
	}

	if($_GET["allMsg"])
	{
		$db = mysqli_connect("localhost", "root", "", "auto");
		if($db->connect_error)
		{
			die($db->connect_error);
		}
		
		createTableEngineChat($db);

		$result = mysqli_query($db, "SELECT * FROM engine_chat") or die(mysqli_error($db));
		$answer = array();
		if(mysqli_num_rows($result) != 0)
		{
			$row = mysqli_fetch_assoc($result);
			do{
				$arr = array("date" => $row["date"],"author" => $row["author"], "text" => $row["text"]);
				array_unshift($answer, $arr);
			}while($row = mysqli_fetch_assoc($result));
		}
		mysqli_close($db);
		echo json_encode($answer);
	}

	// создание таблицы users если она еще не существует
	function createTableEngineChat($db) {
		$query = "CREATE TABLE IF NOT EXISTS engine_chat (
  			id int(11) NOT NULL AUTO_INCREMENT,
  			`date` varchar(100) NOT NULL,
  			author varchar(100) NOT NULL,
  			`text` text NOT NULL,
  			PRIMARY KEY (id)
		) ENGINE=InnoDB DEFAULT CHARSET=utf8;";

		mysqli_query($db, $query) or die(mysqli_error($db));
	}
 ?>