import styled from "@emotion/styled";
import { SyntheticEvent, useCallback, useState } from "react";

type SearchBarProps = {
  onChange(value: string): void;
  loading: boolean;
};

export function SearchBar({ onChange, loading }: SearchBarProps) {
  const [value, setValue] = useState("");

  const handleDebouncedChange = useCallback(
    (e: SyntheticEvent<HTMLInputElement>) => {
      setValue(e.currentTarget.value);
      onChange(e.currentTarget.value);
    },
    [],
  );

  return (
    <SearchBarContainer>
      <InputWrapper isLoading={loading}>
        <input
          type="text"
          placeholder="Search..."
          onChange={handleDebouncedChange}
          value={value}
        />
      </InputWrapper>
    </SearchBarContainer>
  );
}

const SearchBarContainer = styled.div`
  padding: 10px;
  display: flex;
  justify-content: center;
`;

const InputWrapper = styled.div<{ isLoading: boolean }>`
  position: relative;
  flex-basis: 400px;

  & > input {
    box-sizing: border-box;
    height: 30px;
    width: 100%;
    position: relative;
  }

  &:after {
    display: ${(props) => (props.isLoading ? "inline-block" : "none")};
    position: absolute;
    content: " ";
    top: 5px;
    right: 5px;
    width: 20px;
    height: 20px;
    border: 2px solid white;
    border-bottom-color: grey;
    border-radius: 50%;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
  }

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
