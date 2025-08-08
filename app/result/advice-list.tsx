"use client"
import type { Answers } from "@/lib/types"
import Link from "next/link"
import { ExternalLink, Plus, Minus } from "lucide-react"
import { useState } from "react"

interface AdviceListProps {
  advice: string[]
  answers?: Answers
}

export function AdviceList({ advice, answers }: AdviceListProps) {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())

  const toggleItem = (id: string) => {
    const newExpanded = new Set(expandedItems)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedItems(newExpanded)
  }

  // 特別なニーズに基づいたアドバイスを生成
  const specialNeedsAdvice = [
    {
      id: "allergy",
      title: "食物アレルギー対策",
      content:
        "アレルギー対応の非常食を備蓄し、医薬品（エピペンなど）も用意しておきましょう。家族全員がアレルギーについて理解し、対応できるようにしておくことが重要です。",
      icon: "🍽️",
      show: answers?.specialNeeds?.allergy,
    },
    {
      id: "care",
      title: "介護が必要な方の対策",
      content:
        "介護用品（おむつ、清拭剤など）の備蓄、服用中の薬のリスト作成、避難所での介護スペース確保の事前相談などが重要です。また、介護者自身の健康管理も忘れずに。",
      icon: "👵",
      show: answers?.specialNeeds?.care,
    },
    {
      id: "illness",
      title: "持病がある方の対策",
      content:
        "最低2週間分の常備薬を用意し、お薬手帳のコピーを保管しておきましょう。医療機器が必要な場合は、停電対策も考慮してください。",
      icon: "💊",
      show: answers?.specialNeeds?.illness,
    },
    {
      id: "disability",
      title: "障がいがある方の対策",
      content:
        "個別の避難計画を作成し、必要な支援機器・道具を備えておきましょう。地域の支援制度を事前に確認し、避難訓練に参加することも大切です。",
      icon: "♿",
      show: answers?.specialNeeds?.disability,
    },
    {
      id: "heatSensitive",
      title: "暑さに弱い方の対策",
      content: "携帯扇風機、冷却シートを用意しましょう。水分補給用の経口補水液も備蓄しておくと安心です。",
      icon: "🌡️",
      show: answers?.specialNeeds?.heatSensitive,
    },
    {
      id: "coldSensitive",
      title: "寒さに弱い方の対策",
      content:
        "使い捨てカイロ、厚手の毛布、防寒着を備蓄しましょう。避難所は冷えることが多いので、重ね着できる衣類を用意しておくことをおすすめします。",
      icon: "❄️",
      show: answers?.specialNeeds?.coldSensitive,
    },
    {
      id: "sweetTooth",
      title: "甘いものが好きな方の対策",
      content:
        "チョコレートやキャンディなどの保存の効く甘いものを備蓄しておくと、ストレス軽減に役立ちます。ただし、賞味期限と保管場所に注意しましょう。",
      icon: "🍫",
      show: answers?.specialNeeds?.sweetTooth,
    },
    {
      id: "pickyEater",
      title: "食べ物の好き嫌いが多い方の対策",
      content:
        "普段から食べ慣れているものを中心に備蓄し、少しずつ食べられるよう小分けにしておくと良いでしょう。栄養補助食品も検討してください。",
      icon: "🍽️",
      show: answers?.specialNeeds?.pickyEater,
    },
    {
      id: "germSensitive",
      title: "衛生面が気になる方の対策",
      content:
        "除菌ウェットティッシュ、ハンドソープ、マスク、使い捨て手袋などを多めに備蓄しましょう。簡易トイレ用の消臭剤も役立ちます。",
      icon: "🧼",
      show: answers?.specialNeeds?.germSensitive,
    },
    {
      id: "dislikeInsects",
      title: "虫が苦手な方の対策",
      content:
        "虫除けスプレー、蚊取り線香、防虫ネットなどを用意しておきましょう。避難所では窓際を避けるなどの工夫も有効です。",
      icon: "🦟",
      show: answers?.specialNeeds?.dislikeInsects,
    },
  ]

  // 家族構成に基づいたアドバイス
  const familyAdvice = [
    {
      id: "family_contact",
      title: "家族との連絡方法について",
      content:
        "災害発生時、家族とどうやって合流するか決めていますか？集合場所や、スマホが使えないときの連絡手段を事前に決めておきましょう。災害用伝言ダイヤル171の使い方を家族全員で確認し、複数の集合場所（自宅、学校、職場近くの避難所など）を決めておくことが大切です。",
      icon: "📞",
      show: answers?.members && answers.members.length > 1, // 本人以外に家族がいる場合
    },
    {
      id: "child",
      title: "子どもがいる家庭の対策",
      content:
        "子どもの年齢に合わせた食料・ミルク・おむつなどの備蓄、お気に入りのおもちゃや絵本を非常用バッグに入れておくと安心です。また、避難時の約束事を家族で決めておきましょう。",
      icon: "👶",
      show: answers?.members?.some((m) => m.role === "child" && m.age < 12),
    },
    {
      id: "pet",
      title: "ペットがいる家庭の対策",
      content:
        "ペットフード、水、トイレ用品の備蓄、キャリーケースの用意が必要です。ペット用の避難所情報も事前に確認しておきましょう。",
      icon: "🐾",
      show: answers?.members?.some((m) => m.role === "pet"),
    },
    {
      id: "elder",
      title: "高齢者がいる家庭の対策",
      content:
        "服用中の薬のリスト作成、移動補助具の確保、緊急連絡先の明確化が重要です。また、避難経路のバリアフリー状況も確認しておきましょう。",
      icon: "👴",
      show: answers?.members?.some((m) => m.role === "elder" || m.age >= 65),
    },
  ]

  // 電源確保に関するアドバイス
  const powerAdvice = {
    "solar+battery": {
      title: "太陽光発電＋蓄電池の活用法",
      content:
        "災害時は太陽光発電と蓄電池を効率的に使うために、使用する電気機器の優先順位を決めておきましょう。また、長期停電に備えて節電方法も家族で共有しておくことが大切です。",
      icon: "☀️",
      show: answers?.powerBackup === "solar+battery",
    },
    solarOnly: {
      title: "太陽光発電のみの対策",
      content:
        "太陽光発電は停電時に自動停止する場合があります。自立運転への切り替え方法を確認し、使用可能なコンセントを把握しておきましょう。日中のみ発電するため、夜間用のバッテリーも検討してください。",
      icon: "🔆",
      show: answers?.powerBackup === "solarOnly",
    },
    portableBattery: {
      title: "ポータブル電源の活用法",
      content:
        "ポータブル電源は普段から満充電を維持し、定期的に使用して劣化を防ぎましょう。複数の充電方法（ソーラー、手回し等）を確保しておくと安心です。",
      icon: "🔋",
      show: answers?.powerBackup === "portableBattery",
    },
    evOrGenerator: {
      title: "EV車／発電機の活用法",
      content:
        "EV車は大容量バッテリーとして活用できます。必要なアダプターを用意し、使用方法を確認しておきましょう。発電機は燃料の備蓄と換気に注意が必要です。",
      icon: "🚗",
      show: answers?.powerBackup === "evOrGenerator",
    },
    none: {
      title: "電源確保の基本対策",
      content:
        "手回し充電式ラジオ、ソーラーチャージャー、乾電池の備蓄が基本です。スマートフォンの省電力設定方法も確認しておきましょう。",
      icon: "📱",
      show: answers?.powerBackup === "none",
    },
  }

  // 車の有無に関するアドバイス
  const carAdvice = {
    has: {
      title: "車を活用した防災対策",
      content:
        "車は避難手段だけでなく、一時的な避難場所にもなります。常に燃料を半分以上保ち、車中泊グッズ（断熱シート、換気用品等）も用意しておくと安心です。",
      icon: "🚙",
      show: answers?.hasCar,
    },
    none: {
      title: "車がない場合の避難対策",
      content:
        "徒歩での避難を想定し、リュックサックタイプの非常用バッグを用意しましょう。また、公共交通機関の災害時の運行情報の入手方法も確認しておくことが大切です。",
      icon: "🚶",
      show: answers?.hasCar === false,
    },
  }

  // ローリングストックに関するアドバイス
  const stockAdvice = {
    yes: {
      title: "ローリングストックの効率化",
      content:
        "定期的に在庫確認を行い、消費と補充のサイクルを維持しましょう。賞味期限が近いものはカレンダーに記録しておくと管理が楽になります。",
      icon: "🔄",
      show: answers?.rollingStock,
    },
    no: {
      title: "備蓄の始め方",
      content:
        "まずは3日分の水と食料から始め、徐々に1週間分に増やしていきましょう。普段使いできるものを選ぶと、ローリングストックに移行しやすくなります。",
      icon: "📦",
      show: answers?.rollingStock === false,
    },
  }

  // 関連記事のデータ
  const relatedArticles = {
    allergy: [
      { title: "食物アレルギーと災害時の対策", url: "#" },
      { title: "アレルギー対応の非常食リスト", url: "#" },
    ],
    care: [
      { title: "介護が必要な方の避難計画", url: "#" },
      { title: "災害時の介護用品チェックリスト", url: "#" },
    ],
    illness: [{ title: "持病がある方の災害対策ガイド", url: "#" }],
    disability: [
      { title: "障がい者向け防災ハンドブック", url: "#" },
      { title: "バリアフリー避難所マップの作り方", url: "#" },
    ],
    heatSensitive: [{ title: "熱中症対策と防災グッズ", url: "#" }],
    coldSensitive: [{ title: "寒さ対策と防寒グッズの選び方", url: "#" }],
    child: [
      { title: "子どもと一緒に学ぶ防災", url: "#" },
      { title: "子ども向け防災グッズリスト", url: "#" },
    ],
    pet: [
      { title: "ペットと一緒に避難するための準備", url: "#" },
      { title: "ペット用防災グッズチェックリスト", url: "#" },
    ],
    elder: [{ title: "高齢者の防災対策ガイド", url: "#" }],
    general: [
      { title: "EcoFlow ポータブル電源 DELTA3 Plus", url: "#" },
      { title: "DELTA3 Plus + 220W両面受光型ソーラーパネルGen2", url: "#" },
    ],
  }

  // ID からカテゴリーへのマッピングを定義
  const categoryMapping: Record<string, keyof typeof relatedArticles> = {
    // 特別なニーズ
    allergy: "allergy",
    care: "care",
    illness: "illness",
    disability: "disability",
    heatSensitive: "heatSensitive",
    coldSensitive: "coldSensitive",
    sweetTooth: "general",
    pickyEater: "general",
    germSensitive: "general",
    dislikeInsects: "general",

    // 家族構成
    child: "child",
    pet: "pet",
    elder: "elder",

    // 電源確保
    "solar+battery": "general",
    solarOnly: "general",
    portableBattery: "general",
    evOrGenerator: "general",
    none: "general",

    // 車の有無
    has: "general",
    none: "general",

    // ローリングストック
    yes: "general",
    no: "general",

    // 一般的なアドバイス
    general1: "general",
    general2: "general",
    general3: "general",
  }

  // アドバイスIDに基づいて関連記事を取得する関数
  const getRelatedArticles = (id: string) => {
    if (!id) return relatedArticles.general

    // ID からカテゴリーを取得（マッピングにない場合は general を使用）
    const category = categoryMapping[id] || "general"

    return relatedArticles[category] || relatedArticles.general
  }

  // 防災に関するお悩みに基づいたアドバイスを追加
  const disasterConcernsAdvice = [
    {
      id: "unknownGoods",
      title: "必要な防災グッズについて",
      content:
        "必要な防災グッズは人によって異なります。備蓄リストや持ち出しリストを参考に、必要なものを確認して購入しておきましょう。",
      icon: "🛒",
      show: answers?.disasterConcerns?.unknownGoods,
    },
    {
      id: "noSpace",
      title: "備蓄品の収納スペース確保",
      content: "棚下やベッド下、玄関や床下収納など分散収納することで、容量を確保し効率的に備蓄を行いましょう。",
      icon: "📦",
      show: answers?.disasterConcerns?.noSpace,
    },
    {
      id: "managementTrouble",
      title: "備蓄品の管理方法",
      content:
        "スマホのリマインダーに利用期限を登録しつつ、使った分だけ買い足すローリングストックで新旧入れ替えの手間を削減しましょう。",
      icon: "📱",
      show: answers?.disasterConcerns?.managementTrouble,
    },
    {
      id: "furnitureNotSecured",
      title: "家具・家電の転倒防止対策",
      content:
        "壁面にL字型金具などを用いてしっかり固定しましょう。家具を固定する際は、ビスは必ず柱や間柱など下地のある部分に打ち込み、石こうボードだけに留めないことが重要です。",
      icon: "🔧",
      show: answers?.disasterConcerns?.furnitureNotSecured,
    },
    {
      id: "earthquakeResistanceWorry",
      title: "住宅の耐震性能について",
      content:
        "ヘーベルハウス・ヘーベルメゾンでは、基本構造において耐震等級3（最高ランク）を標準としております。改築や経年劣化などによって耐震補強が必要になっていないか確認しましょう。",
      icon: "🏠",
      show: answers?.disasterConcerns?.earthquakeResistanceWorry,
    },
    {
      id: "floodWorry",
      title: "浸水・止水対策について",
      content: "玄関に止水板を設置できるか検討しましょう。給湯器などの設備は浸水を想定しない場所に設置しましょう。",
      icon: "🌊",
      show: answers?.disasterConcerns?.floodWorry,
    },
    {
      id: "firePreventionInsufficient",
      title: "火災対策について",
      content: "警報器を各部屋に設置し10年毎交換。家庭用消火器は玄関と台所に設置し、年1回点検しよう。",
      icon: "🔥",
      show: answers?.disasterConcerns?.firePreventionInsufficient,
    },
    {
      id: "powerOutageWorry",
      title: "停電・断水時の生活維持",
      content: "水や電気、ガス、物流が止まっても7日分の生活が維持できるように備蓄を備えておきましょう。",
      icon: "⚡",
      show: answers?.disasterConcerns?.powerOutageWorry,
    },
    {
      id: "evacuationRouteUnknown",
      title: "避難場所・避難経路の確認",
      content: "ハザードマップで避難場所や危険区域を確認し、昼夜に避難場所まで歩いていく練習をしておきましょう。",
      icon: "🗺️",
      show: answers?.disasterConcerns?.evacuationRouteUnknown,
    },
    {
      id: "noSafetyConfirmation",
      title: "家族との安否確認方法",
      content: "家族会議で171やLINEなどの連絡サービスの使い方、待ち合わせ場所などを明確化して共有しておきましょう。",
      icon: "📞",
      show: answers?.disasterConcerns?.noSafetyConfirmation,
    },
    {
      id: "disasterInfoUnknown",
      title: "災害情報の確認方法",
      content: "LONGLIFE AESGiSを用いることで、地震被害や水害被害の状況を推定できます。ぜひご活用ください。",
      icon: "📡",
      show: answers?.disasterConcerns?.disasterInfoUnknown,
    },
    {
      id: "typhoonPrepUnknown",
      title: "台風・大雨前の対策",
      content:
        "前日までに雨戸締め側溝掃除、ベランダ物移動、車給油、スマホやポータブル電源をフル充電。非常持出袋をすぐに持ち出せる準備をしておきましょう。",
      icon: "🌀",
      show: answers?.disasterConcerns?.typhoonPrepUnknown,
    },
    {
      id: "postDisasterActionUnknown",
      title: "被災直後の行動について",
      content: "ガスメーターの復旧や、食器棚のロック解除が必要です。詳しくはHEBELIAN NET. をご確認ください。",
      icon: "🔧",
      show: answers?.disasterConcerns?.postDisasterActionUnknown,
    },
    {
      id: "trainingDifficult",
      title: "防災訓練・講習への参加",
      content:
        "災害時には近隣同士の人が協力して助け合う「共助」が大切です。何かあった時はお互い様の精神で助け合えるためにも、防災訓練に参加しましょう。",
      icon: "👥",
      show: answers?.disasterConcerns?.trainingDifficult,
    },
    {
      id: "insuranceNotReviewed",
      title: "地震保険・火災保険の見直し",
      content:
        "お客様の家やご家族をよく知る旭化成ホームズグループだからこそ安心・納得いただける保険を提案可能です。旭化成ホームズグループが対応するので以下のリンクからいつでもご相談ください。",
      icon: "🛡️",
      show: answers?.disasterConcerns?.insuranceNotReviewed,
    },
    {
      id: "petEvacuationWorry",
      title: "ペットとの避難について",
      content:
        "避難所のペット受入可否を確認し、ケージやリード、3日分のフードなどをまとめて同行避難の練習をしておきましょう。",
      icon: "🐾",
      show: answers?.disasterConcerns?.petEvacuationWorry,
    },
  ]

  // 表示するアドバイスをフィルタリング
  const filteredAdvice = [
    ...specialNeedsAdvice.filter((item) => item.show),
    ...familyAdvice.filter((item) => item.show),
    ...Object.values(powerAdvice).filter((item) => item.show),
    ...Object.values(carAdvice).filter((item) => item.show),
    ...Object.values(stockAdvice).filter((item) => item.show),
    ...disasterConcernsAdvice.filter((item) => item.show),
  ]

  // 回答データがない場合や、フィルタリングの結果が0件の場合は、一般的なアドバイスを表示
  const displayAdvice =
    filteredAdvice.length > 0
      ? filteredAdvice
      : [
          {
            id: "general1",
            title: "水の備蓄について",
            content: "一人あたり1日3Lを目安に、最低3日分の水を備蓄しましょう。定期的に入れ替えることを忘れずに。",
            icon: "💧",
            show: true,
          },
          {
            id: "general2",
            title: "食料の備蓄について",
            content: "非常食は、調理不要で賞味期限が長いものを選びましょう。アレルギーのある方は特に注意が必要です。",
            icon: "🍞",
            show: true,
          },
          {
            id: "general3",
            title: "避難経路の確認",
            content: "家族で避難場所と経路を確認し、定期的に避難訓練を行いましょう。",
            icon: "🚪",
            show: true,
          },
        ]

  // 避難についてのアドバイスを常に追加
  const evacuationAdvice = {
    id: "evacuation",
    title: "避難について",
    content:
      "災害発生時、安全が確認できるまでは一時的に家の外に避難する必要があります。いざというときのためにも、近隣の避難場所を確認して、荷物をすぐに持ち出せるように準備をしておきましょう。",
    icon: "🏃",
    show: true,
  }

  // 避難アドバイスを先頭に追加
  const finalDisplayAdvice = [evacuationAdvice, ...displayAdvice]

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-slate-800">今すぐ実施できる</h2>
        <div className="text-2xl font-bold text-slate-800 border-b-2 border-yellow-400 pb-2 mb-4">
          あなたの防災行動アドバイス
        </div>
      </div>
      <p className="text-slate-600 mb-6">
        あなたの回答にもとづいた、事前に知っておくべき防災行動のアドバイスです。
        日頃から意識して準備しておくことで、いざという時の安心につながります。
      </p>

      <div className="space-y-3">
        {finalDisplayAdvice.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-slate-100">
            {/* アコーディオンヘッダー */}
            <div
              className="flex items-center justify-between p-4 cursor-pointer hover:bg-slate-50 transition-colors"
              onClick={() => toggleItem(item.id)}
            >
              <div className="flex items-center gap-4">
                {/* アイコン */}
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-xl">
                  {item.icon}
                </div>
                {/* タイトル */}
                <h3 className="font-medium text-slate-800 text-lg">{item.title}</h3>
              </div>
              {/* 展開ボタン */}
              <button className="w-8 h-8 bg-teal-500 text-white rounded-full flex items-center justify-center hover:bg-teal-600 transition-colors">
                {expandedItems.has(item.id) ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              </button>
            </div>

            {/* アコーディオンコンテンツ */}
            {expandedItems.has(item.id) && (
              <div className="px-4 pb-4">
                <div className="pl-16">
                  <p className="text-slate-600 leading-relaxed mb-4">{item.content}</p>

                  {/* 関連記事リンク */}
                  {getRelatedArticles(item.id).slice(0, 2).length > 0 && (
                    <div className="pt-3 border-t border-slate-100">
                      <p className="text-xs font-medium text-slate-500 mb-2">関連記事</p>
                      <ul className="space-y-1">
                        {getRelatedArticles(item.id)
                          .slice(0, 2)
                          .map((article, idx) => (
                            <li key={idx} className="text-sm">
                              <Link
                                href={article.url}
                                className="text-blue-600 hover:underline flex items-center gap-1"
                              >
                                <ExternalLink className="w-3 h-3" />
                                {article.title}
                              </Link>
                            </li>
                          ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
