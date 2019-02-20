<?php

	if($_POST["newMsg"])
	{
		$msg = json_decode($_POST['newMsg']);
		$date = $msg->date;
		$autor = $msg->autor;
		$text = $msg->text;

		if(!empty($date) && !empty($autor) &&  !empty($text))
		{

			$db = mysqli_connect("localhost", "root", "", "auto");
			$query = mysqli_query($db, "INSERT INTO chat2 (date, autor, text) VALUES('$date', '$autor', '$text')");
			mysqli_close($db);
			echo "success";
			exit;
		}

	}

	if($_POST["allMsg"])
	{
		$db = mysqli_connect("localhost", "root", "", "auto");
		$result = mysqli_query($db, "SELECT * FROM chat2");
		$answer = array();
		if(mysqli_num_rows($result) != 0)
		{
			$row = mysqli_fetch_assoc($result);
			do{
				$arr = array("date" => $row["date"],"autor" => $row["autor"], "text" => $row["text"]);
				array_push($answer, $arr);
			}while($row = mysqli_fetch_assoc($result));
		}
		mysqli_close($db);
		echo json_encode($answer);
	}
 ?>