<?php

class CheatLogs {
	private $db;
	private $user;

	public function __construct($db, $user) {
		$this->db = $db;
		$this->user = $user;
	}

	public function query($postdata) {
		if ($this->user->getClass() < User::CLASS_ADMIN) {
			throw new Exception(L::get("PERMISSION_DENIED"), 401);
		}

		$limit = (int)$postdata["limit"] ?: 25;
		$index = (int)$postdata["index"] ?: 0;
		$userid = (int)$postdata["userid"] ?: 0;

		switch ($postdata["sort"]) {
			case 'rate': $sortColumn = 'cheatlog.rate'; break;
			case 'time': $sortColumn = 'cheatlog.time'; break;
			case 'ip': $sortColumn = 'cheatlog.ip'; break;
			case 'port': $sortColumn = 'cheatlog.port'; break;
			case 'connectable': $sortColumn = 'cheatlog.connectable'; break;
			case 'agent': $sortColumn = 'cheatlog.agent'; break;
			case 'up': $sortColumn = 'cheatlog.uploaded'; break;
			case 'down': $sortColumn = 'cheatlog.downloaded'; break;
			default: $sortColumn = 'cheatlog.id';
		}

		if ($postdata["order"] == "asc") {
			$order = "ASC";
		} else {
			$order = "DESC";
		}

		$where = "";
		$whereParams = array();

		if ($userid > 0) {
			$where = "WHERE userid = ?";
			$whereParams[] = $userid;
		}

		$countQuery = "SELECT COUNT(*) FROM cheatlog " . $where;
		$sth = $this->db->prepare($countQuery);
		foreach ($whereParams as $i => $param) {
			$sth->bindParam($i + 1, $whereParams[$i], PDO::PARAM_INT);
		}
		$sth->execute();
		$res = $sth->fetch();
		$totalCount = $res[0];

		// Note: $sortColumn and $order are validated from switch statement, safe to use
		$query = "SELECT cheatlog.*, torrents.name, users.id as uid, users.username, users.warned, users.enabled, users.mbitupp FROM cheatlog LEFT JOIN users ON userid = users.id LEFT JOIN torrents ON cheatlog.torrentid = torrents.id " . $where . " ORDER BY " . $sortColumn . " " . $order . " LIMIT ?, ?";
		$sth = $this->db->prepare($query);
		$paramIndex = 1;
		foreach ($whereParams as $i => $param) {
			$sth->bindParam($paramIndex, $whereParams[$i], PDO::PARAM_INT);
			$paramIndex++;
		}
		$sth->bindParam($paramIndex, $index, PDO::PARAM_INT);
		$paramIndex++;
		$sth->bindParam($paramIndex, $limit, PDO::PARAM_INT);
		$sth->execute();

		$result = array();
		while($r = $sth->fetch(PDO::FETCH_ASSOC)) {
			$row = array();
			$row["user"] = array(
				"id" => $r["uid"],
				"username" => $r["username"],
				"warned" => $r["warned"],
				"enabled" => $r["enabled"],
				"mbitupp" => $r["mbitupp"]
				);
			$row["id"] = $r["id"];
			$row["name"] = $r["name"];
			$row["torrentid"] = $r["torrentid"];
			$row["ip"] = $r["ip"];
			$row["port"] = $r["port"];
			$row["uploaded"] = $r["uploaded"];
			$row["downloaded"] = $r["downloaded"];
			$row["rate"] = $r["rate"];
			$row["seeder"] = $r["seeder"];
			$row["connectable"] = $r["connectable"];
			$row["agent"] = $r["agent"];
			$row["time"] = $r["time"];
			$row["added"] = $r["datum"];
			$row["agentdiff"] = $r["agentdiff"];
			$row["adsl"] = $r["adsl"];
			array_push($result, $row);
		}

		return Array($result, $totalCount);
	}
}
