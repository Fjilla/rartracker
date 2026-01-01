<?php

class L {
	private static $defaultLanguage;
	private static $cache = [];

	public static function setDefaultLanguage($language) {
		self::$defaultLanguage = $language;
	}

	public static function get($string, $variables = [], $language = null) {
		if (!$language || ($language && !in_array($language, Config::$languages))) {
			$language = self::$defaultLanguage;
		}
		if (!isset(self::$cache[$language])) {
			$localeFile = __DIR__ . "/locales/" . $language . ".json";
			$localeData = @file_get_contents($localeFile);
			if ($localeData === false) {
				self::$cache[$language] = [];
			} else {
				self::$cache[$language] = json_decode($localeData, true) ?? [];
			}
		}
		$sentence = self::$cache[$language][$string] ?? null;
		if (!$sentence) {
			return $string;
		}

              if (is_array($variables)){
		for($i = 0; $i < (count($variables)); $i++) {
			$sentence = str_replace("{".$i."}", $variables[$i], $sentence);
		}
              }
		return $sentence;
	}

}


