let timeToRedraw;
let text = null;
let relationDrawing = new Map();
const relationRoles = {
    "DIRECTIONOFBODYSTRUCTURE": [
        "DIRECTION",
        "BODYSTRUCTURE"
    ],
    "DIRECTIONOFCONDITION": [
        "DIRECTION",
        "CONDITION"
    ],
    "DIRECTIONOFEXAMINATION": [
        "DIRECTION",
        "EXAMINATION"
    ],
    "DIRECTIONOFTREATMENT": [
        "DIRECTION",
        "TREATMENT"
    ],
    "DOSAGEOFMEDICATION": [
        "DOSAGE",
        "MEDICATION"
    ],
    "FORMOFMEDICATION": [
        "FORM",
        "MEDICATION"
    ],
    "FREQUENCYOFMEDICATION": [
        "FREQUENCY",
        "MEDICATION"
    ],
    "FREQUENCYOFTREATMENT": [
        "FREQUENCY",
        "TREATMENT"
    ],
    "QUALIFIEROFCONDITION": [
        "QUALIFIER",
        "CONDITION"
    ],
    "SCALEOFCONDITION": [
        "SCALE",
        "CONDITION"
    ],
    "RELATIONOFEXAMINATION": [
        "RELATION",
        "EXAMINATION"
    ],
    "ROUTEOFMEDICATION": [
        "ROUTE",
        "MEDICATION"
    ],
    "TIMEOFCONDITION": [
        "TIME",
        "CONDITION"
    ],
    "TIMEOFEVENT": [
        "TIME",
        "EVENT"
    ],
    "TIMEOFEXAMINATION": [
        "TIME",
        "EXAMINATION"
    ],
    "TIMEOFMEDICATION": [
        "TIME",
        "MEDICATION"
    ],
    "TIMEOFTREATMENT": [
        "TIME",
        "TREATMENT"
    ],
    "UNITOFCONDITION": [
        "UNIT",
        "CONDITION"
    ],
    "UNITOFEXAMINATION": [
        "UNIT",
        "EXAMINATION"
    ],
    "VALUEOFCONDITION": [
        "VALUE",
        "CONDITION"
    ],
    "VALUEOFEXAMINATION": [
        "VALUE",
        "EXAMINATION"
    ],
    "MEDICATIONTREATSCONDITION": [
        "MEDICATION",
        "CONDITION"
    ],
    "MEDICATIONCAUSESCONDITION": [
        "MEDICATION",
        "CONDITION"
    ],
    "EXAMINATIONFINDSCONDITION": [
        "EXAMINATION",
        "CONDITION"
    ],
    "TREATMENTTREATSCONDITION": [
        "TREATMENT",
        "CONDITION"
    ],
    "TREATMENTCAUSESCONDITION": [
        "TREATMENT",
        "CONDITION"
    ],
    "BODYSITEOFCONDITION": [
        "BODYSTRUCTURE",
        "CONDITION"
    ],
    "BODYSITEOFTREATMENT": [
        "BODYSTRUCTURE",
        "TREATMENT"
    ],
    "MUTATIONTYPEOFGENE": [
        "MUTATIONTYPE",
        "GENE"
    ],
    "MUTATIONTYPEOFVARIANT": [
        "MUTATIONTYPE",
        "VARIANT"
    ],
    "EXPRESSIONOFGENE": [
        "EXPRESSION",
        "GENE"
    ],
    "EXPRESSIONOFVARIANT": [
        "EXPRESSION",
        "VARIANT"
    ],
    "VARIANTOFGENE": [
        "VARIANT",
        "GENE"
    ],
    "COURSEOFCONDITION": [
        "COURSE",
        "CONDITION"
    ],
    "COURSEOFEXAMINATION": [
        "COURSE",
        "EXAMINATION"
    ],
    "COURSEOFTREATMENT": [
        "COURSE",
        "TREATMENT"
    ],
    "COURSEOFMEDICATION": [
        "COURSE",
        "MEDICATION"
    ],
    "COURSEOFSUBSTANCEUSE": [
        "COURSE",
        "SUBSTANCEUSE"
    ],
    "FREQUENCYOFCONDITION": [
        "FREQUENCY",
        "CONDITION"
    ],
    "ABBREVIATION": [
        "ABBREVIATEDTERM",
        "FULLTERM"
    ]
};

window.addEventListener("resize", () => {
    document.querySelectorAll(".ta4h-result-section svg").forEach(svg => svg.remove());
    if (timeToRedraw) {
        clearTimeout(timeToRedraw);
    }
    timeToRedraw = setTimeout(function () {
        for (const drawFunction of relationDrawing.values()) {
            drawFunction();
        }
    }, 100);
});

function renderTextAnalyticsForHealth(divId, text, ta4h) {
    try {

        let wordsMap = new Map();
        const rowsUsedSections = new Map();
        const colsUsedSections = new Map();

        const root = document.getElementById(divId);
        const ta4hResultSection = document.createElement("div");
        const ta4hResultText = document.createElement("div");
        ta4hResultSection.classList.add("ta4h-result-section");
        ta4hResultText.classList.add("ta4h-result-text");
        ta4hResultSection.appendChild(ta4hResultText);
        root.innerHTML = "";
        root.appendChild(ta4hResultSection);

        wordsMap.clear();
        let wordCounter = 0;
        let offset = 0;
        const lines = text.split("\n").map(function (line) {
            return line.split(" ")
        });
        for (const line of lines) {
            const lineDiv = document.createElement("div");
            lineDiv.classList.add("line");
            if (line.length === 1 && line[0].length === 0) {
                line.pop();
                lineDiv.classList.add("empty-line");
                offset++;
            }
            for (const word of line) {
                for (let i = 0; i < word.length; i++) {
                    wordsMap.set(offset + i, wordCounter);
                }
                const wordDiv = document.createElement("div");
                wordDiv.classList.add("word");
                const textDiv = document.createElement("div");
                textDiv.classList.add("text");
                textDiv.setAttribute("word", word);
                textDiv.innerText = word;
                wordDiv.append(textDiv);
                wordDiv.id = `word_${wordCounter++}`;
                wordDiv.setAttribute("offset", offset);
                wordDiv.setAttribute("length", word.length);
                offset += word.length + 1;
                lineDiv.append(wordDiv);
            }
            ta4hResultText.append(lineDiv);
        }

        // createEntitiesInView(response)
        const entityTypes = new Set();
        const upperSnakesToCapitalizedText = (s) => s.split('_').map((word) => `${word[0].toUpperCase()}${word.substring(1).toLowerCase()}`).join(' ');
        for (const entity of ta4h.entities) {
            const wordsSet = new Set();
            const startPosition = entity.offset;
            const endPosition = entity.offset + entity.length;
            const entityType = entity.category;

            entityTypes.add(entityType);
            for (let i = startPosition; i < endPosition; i++) {
                if (wordsMap.has(i)) {
                    wordsSet.add(wordsMap.get(i));
                }
            }
            const wordIndices = Array.from(wordsSet).sort(function (a, b) {
                return Number(a) < Number(b) ? -1 : 1;
            });
            const entityText = text.substring(startPosition, endPosition);
            const textSpan = document.createElement("span");
            textSpan.innerText = entityText.replace(/[\s]+/g, " ");
            const element = root.querySelector(`#word_${wordIndices[0]}`);
            if (!element) {
                continue;
            }

            let originalText = element.querySelector(".text").attributes["word"];

            if (Number(element.attributes['offset']) < startPosition) {
                // we have some preceding leftovers to take
                const precedingText = text.substring(Number(element.attributes['offset']), startPosition);
                const precedingLeftoverDiv = document.createElement("div");
                precedingLeftoverDiv.classList.add("word");
                const precedingLeftoverDivText = document.createElement("div");
                precedingLeftoverDivText.classList.add("text");
                precedingLeftoverDivText.innerText = precedingText;
                precedingLeftoverDiv.append(precedingLeftoverDivText);
                element.before(precedingLeftoverDiv);
                element.setAttribute("offset", startPosition);
                originalText = originalText.substring(precedingText.length);
                element.find(".text").setAttribute("word", originalText);
            }

            const id = element.attributes["id"];
            element.setAttribute("id", `entity_${startPosition}`);
            element.querySelectorAll(".text")[0].innerHTML = "";
            element.querySelectorAll(".text")[0].appendChild(textSpan);
            element.classList.add("entity");
            const entityLineDiv = document.createElement("div");
            entityLineDiv.classList.add("entity-line");
            entityLineDiv.style.backgroundColor = `var(--CLASSIFICATION-${entityType.toUpperCase()})`;
            const entityTypeDiv = document.createElement("div");
            entityTypeDiv.classList.add("entity-type");
            entityTypeDiv.innerText = entityType;
            element.appendChild(entityLineDiv);
            element.appendChild(entityTypeDiv);
            if (wordIndices.length === 1) {
                if (originalText.length > entityText.length) {
                    const textToKeep = originalText.substring(entityText.length + (startPosition - Number(element.attributes['offset'])));
                    const textToKeepOffset = entityText.length + Number(element.attributes['offset']);
                    addWordLeftover(textToKeep, element, id, textToKeepOffset);
                }
            } else {
                const lastWordToRemove = ta4hResultText.querySelector(`#word_${wordIndices[wordIndices.length - 1]}`);
                if (lastWordToRemove.attributes['offset'] != null)
                  {
                    var justhere = "Hi";

                    let offsetOfLastWord = Number(lastWordToRemove.attributes['offset']);
                    let lengthOfLastWord = Number(lastWordToRemove.attributes["length"]);
                    for (let i = 1; i < wordIndices.length; i++) {
                        ta4hResultText.querySelector(`#word_${wordIndices[i]}`).remove();
                    }
                    if (endPosition < offsetOfLastWord + lengthOfLastWord) {
                        const leftOverText = text.substring(endPosition, offsetOfLastWord + lengthOfLastWord);
                        addWordLeftover(leftOverText, element, `word_${wordIndices[wordIndices.length - 1]}`, endPosition);
                    }
                }
            }
            if (entity.links) {
                entity.links = entity.links.filter(function (item) {
                    return item.id !== null;
                });
                if (entity.links.length > 0) {
                    addLinkingToEntity(element, entityText, entity);
                }
            }
            if (entity.assertion) {
                for (const assertionCategory in entity.assertion) {
                    const assertionValue = entity.assertion[assertionCategory]
                    const tag = document.createElement("div");
                    tag.classList.add("tag");
                    tag.classList.add(`tag-${assertionCategory}`);
                    tag.innerText = upperSnakesToCapitalizedText(assertionValue);
                    element.querySelector(".text").append(tag);
                }
            }
    }

    if (ta4h.relations.length > 0) {
        drawRelations();
        relationDrawing.set(divId, drawRelations);
    }

    const annotated = ta4hResultText.querySelectorAll(".entity");
    annotated.forEach((txt, i) => {
        txt.style.setProperty("z-index", annotated.length - i + 10
        )
    });

    function drawRelations() {
        const relationsByIds = ta4h.relations.map(function (relation) {
            const relationType = relation.relationType.toUpperCase();
            return [...[...relation.entities]
                .sort((e1, e2) => {
                    return relationRoles[relationType].indexOf(e1.role) - relationRoles[relationType].indexOf(e2.role);
                })
                .map((e) => {
                    const index = Number(e.ref.split("/").pop());
                    const entity = ta4h.entities[index];
                    return `#entity_${entity.offset}`;
                }), relationType];

        }).filter(r => ta4hResultText.querySelector(r[0]) && ta4hResultText.querySelector(r[1]));

        const hist_from = relationsByIds.map(r => r[0])
            .reduce((acc, p) => {
                acc.has(p) ? acc.set(p, acc.get(p) + 1) : acc.set(p, 1);
                return acc;
            }, new Map());

        const hist_to = relationsByIds.map(r => r[1])
            .reduce((acc, p) => {
                acc.has(p) ? acc.set(p, acc.get(p) + 1) : acc.set(p, 1);
                return acc;
            }, new Map());

        for (const id of hist_from.keys()) {
            const entity = ta4hResultText.querySelector(id);
            const w = entity.clientWidth;
            const l = entity.offsetLeft;
            const count = hist_from.get(id);
            const arrowsWidth = (count - 1) * relationsConfig.arrowMinGap;
            entity.setAttribute('first-arrow-from', l + (w / 2) + (arrowsWidth / 2));
        }
        for (const id of hist_to.keys()) {
            const entity = ta4hResultText.querySelector(id);
            const w = entity.clientWidth;
            const l = entity.offsetLeft;
            const count = hist_to.get(id);
            const arrowsWidth = (count - 1) * relationsConfig.arrowMinGap;
            entity.setAttribute('first-arrow-to', l + (w / 2) + (arrowsWidth / 2));
        }

        if (relationsByIds.length === 0) {
            return;
        }
        rowsUsedSections.clear();
        colsUsedSections.clear();
        const relationsLocations = relationsByIds.map((relation => {
            let from = ta4hResultText.querySelector(relation[0]);
            let to = ta4hResultText.querySelector(relation[1]);
            return {
                x1: Number(from.getAttribute('first-arrow-from')),
                y1: from.offsetTop,
                x2: Number(to.getAttribute('first-arrow-to')),
                y2: to.offsetTop,
                t: relationTypeFormatter(relation[2])
            };
        }));
        relationsLocations.sort((a, b) => {
            al = Math.min(a.x1, a.x2);
            ar = Math.max(a.x1, a.x2);
            at = Math.min(a.y1, a.y2);
            ab = Math.max(a.y1, a.y2);
            bl = Math.min(b.x1, b.x2);
            br = Math.max(b.x1, b.x2);
            bt = Math.min(b.y1, b.y2);
            bb = Math.max(b.y1, b.y2);

            if (at === ab && bt === bb) {
                if (at === bt) {
                    return (bl <= al && br >= ar) ? 1 : -1;
                } else {
                    return -1;
                }
            } else if (at === ab) {
                return -1;
            } else if (bt === bb) {
                return 1;
            } else {
                if (b.y2 === a.y2 && a.x2 < b.x2) {
                    return 1;
                } else if (bt <= at && bb >= ab) {
                    return 1;
                } else {
                    return -1;
                }
            }
        });
        const svg = document.createElement("svg");
        svg.setAttribute("width", "100%");
        svg.setAttribute("height", "100%");
        svg.style.position = "absolute";
        svg.style.width = (ta4hResultText.scrollWidth - 1) + "px";
        svg.style.height = (ta4hResultText.scrollHeight - 1) + "px";
        svg.style.top = "0";
        svg.style.left = "0";
        const usedRows = new Set();

        const usedCols = new Map();
        const nerFirstSpan = ta4hResultText.querySelector(".word");
        if (!nerFirstSpan) {
            return;
        }
        let left = nerFirstSpan.offsetLeft - 5;
        for (const relation of relationsLocations) {
            if (relation.y1 === relation.y2) {
                drawLineOnSameRow(svg, relation, usedRows, usedCols);
            } else {
                drawLineOnDifferentRow(svg, relation, usedRows, usedCols, left);
            }
        }
        const svgContainer = document.createElement("div");
        ta4hResultText.appendChild(svgContainer);
        svgContainer.innerHTML += svg.outerHTML;
        ta4hResultText.querySelectorAll("text").forEach((txt, i) => {
            const x = Number(txt.getAttributeNS(null, "xr")) - txt.textLength.baseVal.value / 2;
            const l = txt.getAttributeNS(null, "left");
            txt.setAttributeNS(null, "x", Math.max(l, x));
        })
    }

    function drawLineOnSameRow(svg, params, usedRows, usedCols) {
        let x1 = Math.floor(params.x1);
        let x2 = Math.floor(params.x2);
        let y1 = params.y1;
        let y2 = params.y2;
        let row = params.y1 - relationsConfig.rowMinMargin;

        function checkSection(row, x1, x2) {
            const usedSections = rowsUsedSections.get(row) || [];
            for (const section of usedSections) {
                if ((x1 >= section.x1 && x1 <= section.x2) ||
                    (x2 >= section.x1 && x2 <= section.x2) ||
                    (section.x1 > x1 && section.x1 < x2) ||
                    (section.x2 > x1 && section.x2 < x2)) {
                    return false;
                }
            }
            usedSections.push({x1, x2});
            rowsUsedSections.set(row, usedSections);
            return true;
        }

        while (!checkSection(row, Math.min(x1, x2), Math.max(x1, x2)) && usedRows.has(row)) {
            row -= relationsConfig.rowMinGaps;
        }
        while ((usedCols.get(x1) || []).includes(y1)) {
            x1 -= relationsConfig.arrowMinGap;
        }
        while ((usedCols.get(x2) || []).includes(y2)) {
            x2 -= relationsConfig.arrowMinGap;
        }
        usedRows.add(row);
        if (!usedCols.has(x1)) {
            usedCols.set(x1, new Array());
        }
        if (!usedCols.has(x2)) {
            usedCols.set(x2, new Array());
        }
        usedCols.get(x1).push(y1);
        usedCols.get(x2).push(y2);

        const p = document.createElementNS("http://www.w3.org/2000/svg", "path");
        p.setAttributeNS(null, "id", "pathId" + x1);
        p.setAttributeNS(null, "d", `M ${x1},${y1} V ${row} H ${x2} V ${y1 - relationsConfig.arrowHeight} ${arrowPath(x2, y2)}`);
        p.setAttributeNS(null, "stroke", "black");
        p.setAttributeNS(null, "fill", "none");
        p.setAttributeNS(null, "stroke-width", 2);
        p.setAttributeNS(null, "opacity", 1);
        p.setAttributeNS(null, "fill", "none");
        p.setAttributeNS(null, "stroke-linejoin", "round");
        p.style.display = "block";
        p.classList.add("arrow");
        p.setAttributeNS(null, "relation-type", params.t);

        svg.appendChild(p);
        const d = document.createElementNS("http://www.w3.org/2000/svg", "text");
        d.setAttributeNS(null, "left", Math.min(x1, x2));
        d.setAttributeNS(null, "xr", Math.min(x1, x2) + Math.abs(x1 - x2) / 2);
        d.setAttributeNS(null, "y", row - relationsConfig.labelDistance);
        d.innerHTML = params.t;
        d.classList.add("relation-type");
        svg.appendChild(d);
    }

    function drawLineOnDifferentRow(svg, params, usedRows, usedCols, left) {
        let x1 = Math.floor(params.x1);
        let x2 = Math.floor(params.x2);
        let y1 = params.y1;
        let y2 = params.y2;
        let row1 = params.y1 - relationsConfig.rowMinMargin;
        let row2 = params.y2 - relationsConfig.rowMinMargin;

        function checkSection(col, y1, y2) {
            const usedSections = colsUsedSections.get(col) || [];
            for (const section of usedSections) {
                if ((y1 >= section.y1 && y1 <= section.y2) ||
                    (y2 >= section.y1 && y2 <= section.y2) ||
                    (section.y1 > y1 && section.y1 < y2) ||
                    (section.y2 > y1 && section.y2 < y2)) {
                    return false;
                }
            }
            usedSections.push({y1, y2});
            colsUsedSections.set(col, usedSections);
            return true;
        }

        while (!checkSection(left, y1, y2)) {
            left -= 5;
        }

        while (usedRows.has(row1)) {
            row1 -= relationsConfig.rowMinGaps;
        }

        while (usedRows.has(row2)) {
            row2 -= relationsConfig.rowMinGaps;
        }

        while ((usedCols.get(x1) || []).includes(y1)) {
            x1 -= relationsConfig.arrowMinGap;
        }

        while ((usedCols.get(x2) || []).includes(y2)) {
            x2 -= relationsConfig.arrowMinGap;
        }

        usedRows.add(row1);
        usedRows.add(row2);
        if (!usedCols.has(x1)) {
            usedCols.set(x1, new Array());
        }
        if (!usedCols.has(x2)) {
            usedCols.set(x2, new Array());
        }
        usedCols.get(x1).push(y1);
        usedCols.get(x2).push(y2);

        const p = document.createElementNS("http://www.w3.org/2000/svg", "path");
        p.setAttributeNS(null, "id", "pathIdD");
        p.setAttributeNS(null, "d", `M ${x1},${y1} V ${row1} H ${left} V ${row2} H ${x2} V ${y2 - relationsConfig.arrowHeight} ${arrowPath(x2, y2)}`);
        p.setAttributeNS(null, "stroke", "black");
        p.setAttributeNS(null, "fill", "none");
        p.setAttributeNS(null, "stroke-width", 2);
        p.setAttributeNS(null, "opacity", 1);
        p.setAttributeNS(null, "fill", "none");
        p.setAttributeNS(null, "relation-type", params.t);
        p.setAttributeNS(null, "stroke-linejoin", "round");
        svg.appendChild(p);
        const d = document.createElementNS("http://www.w3.org/2000/svg", "text");
        d.setAttributeNS(null, "left", left + 5);
        d.setAttributeNS(null, "xr", left + (x2 - left) / 2);
        d.setAttributeNS(null, "y", row2 - relationsConfig.labelDistance);
        d.innerHTML = params.t;
        d.classList.add("relation-type");
        svg.appendChild(d);
    }

    function relationTypeFormatter(t) {
        return t[0] + t.substring(1).toLowerCase().replace(/_/g, " ");
    }

    function arrowPath(x, y) {
        return `H ${x + relationsConfig.arrowWidth} L ${x} ${y} L ${x - relationsConfig.arrowWidth} ${y - relationsConfig.arrowHeight} H ${x}`;
    }

    function addWordLeftover(text, element, id, offset) {
        const leftoverDiv = document.createElement("div");
        leftoverDiv.classList.add("word");
        const leftoverDivText = document.createElement("div");
        leftoverDivText.classList.add("text");
        leftoverDivText.innerText = text;
        leftoverDivText.setAttribute("word", text);
        leftoverDiv.append(leftoverDivText);
        leftoverDiv.setAttribute("id", id);
        leftoverDiv.setAttribute("offset", offset);
        leftoverDiv.setAttribute("length", text.length);
        element.after(leftoverDiv);
    }

    function addLinkingToEntity(entityElement, entityText, entity) {
        const umls = entity.links.find(function (item) {
            return item.dataSource.toLowerCase() === "umls"
        });
        const umlsTag = document.createElement("div");
        umlsTag.classList.add("tag");
        umlsTag.classList.add("tag-linking");
        umlsTag.innerText = `UMLS: ${umls.id}`;
        entityElement.querySelector(".text").append(umlsTag);
        const linkingDataDiv = document.createElement("div");
        linkingDataDiv.classList.add("linking-div");
        linkingDataDiv.id = `linking_div_${entityElement.id}`;
        for (const item of entity.links) {
            const linkingDataItemDiv = document.createElement("div");
            const linkingDataItemNameDiv = document.createElement("div");
            const linkingDataItemValueDiv = document.createElement("div");
            linkingDataItemDiv.classList.add("linking-div-item");
            linkingDataItemNameDiv.classList.add("linking-div-item-name");
            linkingDataItemValueDiv.classList.add("linking-div-item-value");
            linkingDataItemNameDiv.innerText = item.dataSource;
            linkingDataItemValueDiv.innerText = item.id;
            linkingDataItemDiv.append(linkingDataItemNameDiv);
            linkingDataItemDiv.append(linkingDataItemValueDiv);
            linkingDataDiv.append(linkingDataItemDiv);
        }
        entityElement.append(linkingDataDiv);
        entityElement.onmouseover = function (e) {
            root.querySelectorAll('.word').forEach(e => e.style["z-index"] = 10);
            entityElement.style["z-index"] = 11;
        };
        }
    }
    catch (error) {
        console.error(error);
        // expected output: ReferenceError: nonExistentFunction is not defined
        // Note - error messages will vary depending on browser
    }


}



const relationsConfig = {
    rowMinMargin: 10,
    rowMinGaps: 7,
    arrowMinGap: 20,
    arrowHeight: 6,
    arrowWidth: 5,
    labelDistance: 3
};


