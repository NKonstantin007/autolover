
<?php

	if($_POST["newMsg"])
	{
		$msg = json_decode($_POST['newMsg']);
		$date = date("d.m.Y H:i:s");
		$autor = $msg->author;
		$text = $msg->text;

		if(!empty($date) && !empty($autor) &&  !empty($text))
		{

			$db = mysqli_connect("localhost", "root", "", "auto");
			$query = mysqli_query($db, "INSERT INTO chat1 (date, author, text) VALUES('$date', '$author', '$text')");
			mysqli_close($db);
			echo "success";
			exit;
		}
		else {
			echo "error";
		}

	}

	if($_GET["allMsg"])
	{
		$db = mysqli_connect("localhost", "root", "", "auto");
		$result = mysqli_query($db, "SELECT * FROM chat1");
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
 ?>