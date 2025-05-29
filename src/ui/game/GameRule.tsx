import ScrollView from '../ScrollView'

const ruleTexts = '1.二十四史是中国古代各朝撰写的二十四部正史的总称 [6]，由清代乾隆皇帝钦定，历来被视作正史 [3]，上起传说中的黄帝时期（约公元前2550年），下至明朝崇祯十七年（1644年） [6]，以纪传体的形式 [4]，记载了中国各个朝代的历史概貌，涵盖古代政治、经济、军事、思想、文化、天文、地理等各方面的内容 [5]，记载了从黄帝到明末共四千多年的历史事迹 [4]，二十四部书，除《史记》《三国志》外，13部称作“书”，9部称作“史”。\n\n'
  + '2.最早出现的名称是“三史”，指《史记》《汉书》《东观汉记》 [1]。从魏晋以至唐朝，三史往往与六经并列，称“六经三史”。后来加上《三国志》，称为四史，也叫“前四史”。唐朝还有“十三史”的说法，出现了像吴武陵《十三代史驳议》之类的书。宋朝，有“十七史”之名，南宋史学家吕祖谦编写的《十七史详解》。明朝在十七史以外，加上《宋史》 《辽史》 《金史》 《元史》，称为二十一史。乾隆朝开四库馆，修《四库全书》，并“钦定”合称“二十四史” [1]。包括《史记》《汉书》《后汉书》《三国志》《晋书》《宋书》《南齐书》《梁书》等 [4]。2006年，中华书局启动“点校本二十四史修订工程”。'

export default function GameRule() {
  const contentWidth = 380
  const contentHeight = 530
  return (
    <ScrollView
      x={-contentWidth / 2}
      y={-contentHeight / 2 + 50}
      scrollWidth={contentWidth}
      scrollHeight={contentHeight - 50}
    >
      <pixiText
        text={ruleTexts}
        style={{
          fontFamily: 'Arial',
          fontWeight: 'bold',
          fontSize: 26,
          wordWrap: true,
          wordWrapWidth: contentWidth,
          whiteSpace: 'pre',
          breakWords: true,
        }}
      >
      </pixiText>
    </ScrollView>

  )
}
