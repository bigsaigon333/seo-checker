import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import { match } from "ts-pattern";
import "./App.module.css";
import { useSubmit } from "./hooks";
import { Level, Result } from "./models";

export default function App() {
  const [results, setResults] = useState<Result[]>([]);

  const { mutate: submit, isPending } = useSubmit();
  const form = useForm({
    defaultValues: {
      url: "",
    },
    onSubmit: async ({ value }) => {
      submit(value, {
        onSuccess: (data) => {
          setResults(data.data);
        },
        onError: (error) => {
          window.alert(
            "일시적으로 서비스를 이용하실 수 없습니다. 잠시 후 다시 시도해주세요."
          );
          console.error("🚀 [submit][onError]", error.message);
        },
      });
    },
  });

  return (
    <section>
      <h1>SEO checker</h1>

      <form
        style={{ display: "flex", marginTop: 60, columnGap: 16 }}
        onSubmit={(event) => {
          event.preventDefault();
          event.stopPropagation();
          form.handleSubmit();
        }}
      >
        <form.Field
          name="url"
          validators={{
            onSubmit: ({ value }) =>
              isValidUrl(value) ? undefined : "Invalid Url",
          }}
        >
          {(field) => (
            <div
              style={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
            >
              <input
                placeholder="url"
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                style={
                  field.state.meta.errors.length > 0
                    ? { boxShadow: "0 0 0 2px red" }
                    : undefined
                }
                onChange={(e) => field.handleChange(e.target.value)}
              />
              {field.state.meta.errors.length > 0 && (
                <em
                  role="alert"
                  style={{ color: "red", fontSize: 14, fontWeight: 500 }}
                >
                  {field.state.meta.errors.join(", ")}
                </em>
              )}
            </div>
          )}
        </form.Field>

        <button disabled={isPending}>submit</button>
      </form>

      <section style={{ marginTop: 24 }}>
        {isPending ? (
          "Loading..."
        ) : (
          <table>
            <tbody>
              {results.map((result) => (
                <tr key={result.name}>
                  <td style={{ width: 50 }}>
                    <LevelIndicator level={result.level} />
                  </td>
                  <td style={{ width: 200 }}>{result.name}</td>
                  <td>{result.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </section>
  );
}

function isValidUrl(value: string): boolean {
  try {
    return !!new URL(value);
  } catch {
    return false;
  }
}

function LevelIndicator({ level }: { level: Level }) {
  return match(level)
    .with(Level.Good, () => (
      <span
        style={{
          display: "block",
          width: 10,
          height: 10,
          borderRadius: "50%",
          backgroundColor: "green",
          position: "relative",
          top: 5,
        }}
      />
    ))
    .with(Level.Neutral, () => (
      <span
        style={{
          display: "block",
          width: 10,
          height: 10,
          borderRadius: "50%",
          backgroundColor: "grey",
          position: "relative",
          top: 5,
        }}
      />
    ))
    .with(Level.NeedsImprovement, () => (
      <span
        style={{
          display: "block",
          width: 10,
          height: 10,
          borderRadius: "50%",
          backgroundColor: "red",
          position: "relative",
          top: 5,
        }}
      />
    ))
    .exhaustive();
}
