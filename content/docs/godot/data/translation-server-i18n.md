---
title: 使用 TranslationServer 实现本地化功能
description: 这是一本实用的指南，通过图文说明介绍 Godot 的 TranslationServer 本地化系统。内容包括如何创建和注册 CSV 翻译文件，如何使用 tr()函数显示文本，如何处理占位符，如何在运行时切换语言，以及如何自动检测操作系统语言设置。
created: 2026-08-11T11:40:16
---

> 如果希望游戏能够覆盖全球玩家市场，那么本地化工作是不可避免的。不过，需要为每种语言分别编写用户界面文本似乎相当困难。实际上，Godot 的 TranslationServer 功能允许你只需在 CSV 文件中添加一行数据即可添加支持的语言，而无需修改任何代码。

---

这个机制非常简单，只需要做三件事：将数据转换为 CSV 格式，将其注册到项目中，然后通过密钥来调用它。

这篇文章详细介绍了这一过程，并配有图表说明。我们以日语、英语和韩语为例，从创建翻译文件开始，到在运行时切换语言以及自动检测操作系统语言的过程。

## TranslationServer 的工作原理

从整体来看, `TranslationServer` 是一个将翻译键与每种语言对应的文本相连接的系统。在代码中直接编写“开始游戏”这样的语句是不合适的，因为这样会导致代码难以维护。相反，我们可以使用一个共享键，比如 START_GAME，然后在运行时提取出当前语言对应的文本。

为什么这个间接引用很重要？如果你在代码中写字面字符串，添加一种语言意味着重写代码。当有三种或五种语言时，需要修改的地方会急剧增加，并成为错误的一个来源。通过一个键，你可以添加语言而不需要触碰任何代码。

```gdscript

# The calling code never changes. Only the returned text varies by language
tr("START_GAME")  # ja -> "ゲームスタート" / en -> "Start Game" / ko -> "게임 시작"
```

因此，本地化工作归根结底就是需要准备一个键值对翻译表，然后根据键值来调用相应的代码。

## 穿件并注册 CSV 翻译文件

我们将该表格以 CSV 格式保存，这是最易于处理的格式。这种格式可以在 Excel 或 Google Sheets 中编辑，因此很容易与那些不是程序员的翻译人员共享。

请在你的项目中创建一个名为 translations/的文件夹，并将 game_text.csv文件按照以下结构进行组织：

```csv
keys,ja,en,ko
START_GAME,ゲームスタート,Start Game,게임 시작
SETTINGS,設定,Settings,설정
QUIT,終了,Quit,종료
HEALTH,体力,Health,체력
LEVEL_COMPLETE,ステージクリア!,Level Complete!,스테이지 클리어!
```

- 第一行（标题行）以 keys对开头，后跟每种语言的区域设置代码 （ ja、 en、 ko），作为列名。
- 后续每一行都是“键名，日语，英语，韩语，…”
- 键名通常使用大写字母加下划线 （ START_GAME， LEVEL_COMPLETE）
- 要添加语言， 请在标题中添加一列并填写翻译内容。

将 CSV 文件放入 `res://translations/` 目录，Godot 会自动导入 ，并为每种语言生成一个 `.translation` 资源（例如 game_text.ja.translation）。剩下的就是将它们注册到项目中。

要注册，请转到 `项目→项目设置→"本地化"选项卡→翻译`，点击`添加`，然后添加所有生成的 `.translation`文件（ `ja`、 `en`和 `ko` 文件）。现在您可以在代码中使用 tr() 了。

## 使用 `tr()` 显示翻译后的文本

注册完成后，您只需通过密钥即可呼叫。

```gdscript
extends Control

func _ready() -> void:
    # returns the translation for the current locale
    # 返回当前语言的翻译
    $TitleLabel.text = tr("START_GAME")     
    $SettingsButton.text = tr("SETTINGS")
    $QuitButton.text = tr("QUIT")
```

传递给 `tr()`参数是 CSV 文件 keys 列中的键名。 如果找不到该键，则返回键名本身 （您可以将其用作备用方案，如下所述）。

> 提示: Godot 4 的 UI 节点（例如标签、按钮等）默认启用了 `auto_translate_mode`。只需在文本框中直接输入翻译键即可实现自动翻译，因此静态 UI 无需调用 `tr()` 函数即可完成翻译 。`tr()`仅在脚本中组装字符串时使用，例如乐谱读数

### 使用占位符嵌入动态值

您经常需要在翻译后的字符串中插入数字，例如“得分：1500”。在 CSV 中写入 {name}占位符，然后使用 GDScript 的 format()将值填入其中。

```csv
keys,ja,en,ko
PLAYER_SCORE,スコア: {score},Score: {score},점수: {score}
HEALTH_STATUS,体力: {current}/{max},Health: {current}/{max},체력: {current}/{max}
```

```gdscript
func update_score_label(score: int) -> void:
    # tr() fetches the translation, format() inserts the value into {score}
    $ScoreLabel.text = tr("PLAYER_SCORE").format({"score": score})
    # ja: "スコア: 1500" / en: "Score: 1500" / ko: "점수: 1500"
```

占位符名称(例如 {score})在所有语言中都相同 。翻译人员不会修改 {score}，只会翻译它周围的文本。即使数字在另一种语言中的位置不同， format()也会将其放置在正确的位置。

## 实践操作：构建带有语言切换器的选项屏幕

角色扮演游戏的标题画面、竞技游戏的选项、移动端的设置标签：无论是什么类型的游戏，本地化游戏都需要用于选择语言的用户界面。利用目前已有的元素，我们来构建一个选项界面, 通过下拉菜单选择语言即可切换整个界面 。

有两种机制可以实现这一点:

- `TranslationServer.set_locale()`切换语言
- `NOTIFICATION_TRANSLATION_CHANGED` 通知告诉每个 UI 节点重新绘制自身。

首先，是切换语言的那一侧（选项屏幕）。这只需要一行代码调用 `set_locale()` 即可。

```gdscript
extends Control

func _on_language_option_selected(index: int) -> void:
    # Switch the locale based on the dropdown selection
    # 语言切换
    match index:
        0: TranslationServer.set_locale("ja")
        1: TranslationServer.set_locale("en")
        2: TranslationServer.set_locale("ko")
    # ^ that alone broadcasts the translation-changed notification to every node
    # 仅这行代码就会向所有节点广播翻译变更通知
```

接下来是存储翻译文本的节点。当 `_notification()` 收到 `NOTIFICATION_TRANSLATION_CHANGED` 事件时，它们会更新自身的文本。

```gdscript
extends Label

func _notification(what: int) -> void:
    # Every node receives this notification when the language changes
    if what == NOTIFICATION_TRANSLATION_CHANGED:
        _refresh_text()

func _refresh_text() -> void:
    # Rebuild script-assembled text, such as strings with placeholders, here
    text = tr("PLAYER_SCORE").format({"score": Global.current_score})
```

有两点需要注意。

- 只有一个地方知道语言切换 ：只有调用 `set_locale()` 的选项屏幕知道发生了切换；其他所有地方都依赖于通知。由于只有 100 个 UI 节点，切换代码不会增加。每个节点都可以专注于刷新自己的显示 ，这使得设计清晰且不易出错。
- 静态 UI 甚至不需要通知 ：如果设置了 `auto_translate_mode` 的标签或按钮有键，Godot 会在语言更改时自动重新翻译。只有当节点在脚本中组装字符串时（例如分数显示），才需要手动调用 `_notification()`

### 首次启动时匹配操作系统语言

在游戏首次启动时根据玩家的操作系统语言进行匹配是一个贴心的设计。可以使用 `OS.get_locale_language()` 获取操作系统语言代码，如果系统支持则使用该语言，否则回退到英语等其他语言。

```gdscript
func _ready() -> void:
    var os_lang := OS.get_locale_language()   # language code only, such as "ja" / "en" / "fr"
    var supported := ["ja", "en", "ko"]
    if os_lang in supported:
        TranslationServer.set_locale(os_lang)
    else:
        TranslationServer.set_locale("en")    # open in English for unsupported languages
```

> OS.get_locale()返回一个区域限定值，例如 "ja_JP"，而 OS.get_locale_language()只返回语言代码 "ja"。语言代码足以设置区域设置，因此后者更为简洁。

将 `从操作系统语言初始化` 与 `在选项中手动切换` 结合起来，本地化游戏的语言部分基本上就完成了。如果想让下次记住所选语言，只需在自动加载时按住该设置并保存，然后再加载即可。

## 常见误区和最佳实践

| 推荐 | 解释 |
| --- | --- |
| 按键请使用大写字母，并用下划线标出 | 保持一致，例如 START_GAME和 LEVEL_COMPLETE |
| 使用占位符 | 不要将动态值直接写入句子中；将它们嵌入为 {name} |
| 准备一个中日韩字体 | 日语、韩语和中文字符默认显示为豆腐（□），除非您的主题使用的字体包含这些字形 |
| 确定备用语言 | 未翻译的键会直接显示键名本身。将英语之类的语言作为最后的安全保障 |
| 仅使用区域设置代码作为列名 | 请勿在 context或 notes列中混用。备注应放在 CSV 文件之外 |

你可以利用 Godot 默认返回未翻译键名的行为来实现备用方案。例如，你可以将键名写成英文句子，这样任何没有对应翻译的语言都会显示英文。

```csv
# Strategy: use English as the key name (untranslated languages show English)
# CSV: keys,ja,ko
#      Start Game,ゲームスタート,게임 시작
$TitleLabel.text = tr("Start Game")   # languages without a translation show "Start Game"
```

对于中日韩字体设置， 《使用主题系统构建一致的用户界面》一文介绍了如何将字体分配给主题。当字符变成 □ 时，首先要怀疑是字体的问题

## 额外提示：一些值得了解的信息，以备后续参考之用

一旦基础内容已经建立，接下来就可以考虑其他主题了。目前你还不需要处理这些主题，但了解这些主题的名称有助于你避免迷失方向。

- 复数形式需要使用 `tr_n()` 和 `PO` 文件来定义：对于需要根据数量变化而调整措辞的语言，比如英语中的 **1 个物品/5 个物品**，可以使用 `tr_n(singular_key, plural_key, count)`来表示复数形式。需要注意的是，复数规则无法在 CSV 文件中定义，而是需要借助 PO（Gettext）文件来配置。日语和韩语并不区分单数与复数，因此这一规则主要适用于西方语言
- 同一个词在不同语境下的含义不同：当一个词根据上下文的不同而具有不同的含义时，比如英语中的“Home”（指一所房子或者指主屏幕），可以通过给该词附加一个上下文参数来加以区分，作为 `tr()` 的第二个参数
- 从右向左书写的语言: 阿拉伯语和希伯来语是从右向左流动的。支持这类语言意味着需要采用镜像布局。建议先为从左向右书写的语言打好基础

## 总结

- **TranslationServer** 将翻译密钥映射到不同语言的文本上。代码仅通过密钥来调用相应的内容
- 使用 CSV 格式构建表格(keys,ja,en,ko)，并将自动生成的 `.translation` 文件注册到项目中。
- `tr()`用于获取某个键的翻译结果。可以使用 `{name}`占位符来嵌入动态值，而 `format()`则可以用于引用具体的值
- `set_locale()`在运行时会进行切换，而 `NOTIFICATION_TRANSLATION_CHANGED` 则会使每个用户界面节点重新绘制自己
- `OS.get_locale_language()` 能够检测操作系统所使用的语言，对于不支持该语言的操作系统则采用替代方案进行处理

从使用一种语言中的单个 `START_GAME` 键开始吧，然后观察 `set_locale()` 在那一刻做了什么。一旦你体验到无需编写代码就能添加语言的功能，那么 i18n 就不再是令人畏惧的事情了
