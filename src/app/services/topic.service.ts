import {Injectable} from '@angular/core';
import {delay, Observable, of, switchMap, throwError} from "rxjs";
import {Apollo} from "apollo-angular";
import {ITopic} from "../interfaces/topic.interface";
import {GRAMMAR_TOPIC_QUERY, TOPIC_QUERY} from "../queries/topic.queries";
import {GrammarTopic} from "../interfaces/grammar-topic.interface";
import {IGrammarSettingPayload} from "../interfaces/grammar-setting.payload.interface";

@Injectable({
    providedIn: 'root'
})
export class TopicService {
    constructor(private readonly apollo: Apollo) {
    }

    public getAllTopics(): Observable<ITopic[]> {
        return this.apollo.watchQuery({query: TOPIC_QUERY}).valueChanges.pipe(
            switchMap(({data, error}) => {
                if (error) {
                    throw throwError(() => error)
                }
                return of(data.getAllTopics);
            })
        );
    }

    public getGrammarTopic(topicId: number, settings: IGrammarSettingPayload[]): Observable<GrammarTopic> {
        return of({
            "header": "Passive Voice (受身形)",
            "formation": "<h2>Formation of Passive Voice (受身形)</h2>\n<ul>\n  <li>For <strong>Group 1</strong> verbs: Change the last \"う\" sound to its \"あ\" sound equivalent and add \"れる\". Example: 書く (kaku) becomes 書かれる (kakareru).</li>\n  <li>For <strong>Group 2</strong> verbs: Remove the \"る\" and add \"られる\". Example: 食べる (taberu) becomes 食べられる (taberareru).</li>\n  <li>For <strong>Irregular verbs</strong>:\n    <ul>\n      <li>する (suru) becomes される (sareru).</li>\n      <li>来る (kuru) becomes 来られる (korareru).</li>\n    </ul>\n  </li>\n</ul>\n<p>The subject is usually marked with \"は\" or \"が\", and the doer of the action is marked with \"に\".</p>",
            "exampleSentences": [
                {
                    "sentence": "犬に足を噛まれた。",
                    "translation": "I was bitten on the leg by a dog."
                },
                {
                    "sentence": "彼は先生に褒められた。",
                    "translation": "He was praised by the teacher."
                },
                {
                    "sentence": "ドアは風に閉められた。",
                    "translation": "The door was closed by the wind."
                }
            ],
            "tasks": [
                {
                    "taskType": "CONVERT_TO_FORMATION",
                    "description": "Convert the following active sentence into passive voice.",
                    "question": "猫が花瓶を倒した。",
                    "correctAnswer": "花瓶は猫に倒された。",
                    "resources": []
                },
                {
                    "taskType": "TRANSLATE_TO_JAPANESE",
                    "description": "Translate the following sentence into Japanese using passive voice.",
                    "question": "The book was read by the student.",
                    "correctAnswer": "本は学生に読まれた。",
                    "resources": []
                },
                {
                    "taskType": "FILL_IN_THE_BLANKS",
                    "description": "Fill in the blank with the correct passive form of the verb.",
                    "question": "彼は警察に______ (捕まえる)。",
                    "correctAnswer": "捕まえられた",
                    "resources": []
                }
            ]
        } as GrammarTopic).pipe(delay(3000));
        return this.apollo.watchQuery({query: GRAMMAR_TOPIC_QUERY, variables: {topicId, settings}}).valueChanges.pipe(
            switchMap(({data, error}) => {
                if (error) {
                    throw throwError(() => error)
                }
                return of(data.getTopicTask);
            })
        );
    }
}
