# Mocha API & SOAP Testing

## Principy

### DRY (Don't Repeat Yourself)
Veškerý kód musí dodržovat DRY princip — žádná duplicita logiky ani kódu. Opakující se části patří do helperů.

### YAGNI (You Aren't Gonna Need It)
Přidávej pouze kód, který je aktuálně potřeba. Nové helpery, funkce nebo abstrakce přidávej až ve chvíli, kdy je skutečně využiješ.

### Žádné if podmínky v helperech
Místo `if/else` bloků používej funkcionální přístup — `filter`, `forEach`, privátní metody. Podmínky komplikují čitelnost a testovatelnost.
